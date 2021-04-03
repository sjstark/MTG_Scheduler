from .db import db
import json

class Project(db.Model):
  __tablename__ = 'projects'

  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String(150), nullable=False)
  start_date = db.Column(db.Date, nullable=False)
  end_date = db.Column(db.Date, nullable=False)

  client_id = db.Column(db.Integer, db.ForeignKey('clients.id'))
  contact_id = db.Column(db.Integer, db.ForeignKey('contacts.id'))

  quote_issued = db.Column(db.Date)
  quote_valid = db.Column(db.Date)

  venue = db.Column(db.String(255))

  admin_notes = db.Column(db.Text)

  shift_dates = db.relationship("Shift_Date", backref = db.backref("project"), cascade = "all, delete-orphan")

  versions = db.relationship("Version", backref = db.backref("project"), cascade = "all, delete-orphan")

  @property
  def positions(self):
    position_ids = set()
    departments = {}

    for shift_date in self.shift_dates:
      for shift in shift_date.shifts:
        position = shift.position
        if position.id not in position_ids:
          position_ids.add(position.id)

          if position.department_id not in departments:
            departments[position.department_id] = {
              'id': position.department_id,
              'title': position.department.title,
              'positions': []
            }

          departments[position.department_id]['positions'].append(position.to_dict())



    return departments

  def to_dict(self):
    return {
      "id": self.id,
      "title": self.title,
      "dates": {
        "start": self.start_date.strftime("%Y-%m-%d"),
        "end": self.end_date.strftime("%Y-%m-%d")
      },
      "client": self.client.to_dict() if self.client else None,
      "contact": self.contact.to_dict() if self.contact else None,
      "quoteIssued": self.quote_issued,
      "quoteValid": self.quote_valid,
      "adminNotes": self.admin_notes,
    }

  def to_dict_full(self):
    return {
      "id": self.id,
      "title": self.title,
      "dates": {
        "start": self.start_date.strftime("%Y-%m-%d"),
        "end": self.end_date.strftime("%Y-%m-%d")
      },
      "client": self.client.to_dict() if self.client else None,
      "contact": self.contact.to_dict() if self.contact else None,
      "quoteIssued": self.quote_issued,
      "quoteValid": self.quote_valid,
      "adminNotes": self.admin_notes,
      # "schedule": {
      #   date:shifts for (date, shifts) in zip(
      #     self.shift_dates,
      #     [shift_date.shifts_list for shift_date in self.shift_dates]
      #   )
      # },
      "schedule": [shift_date.to_schedule() for shift_date in self.shift_dates],
      "departments": self.positions
    }


class Shift_Date(db.Model):
  __tablename__ = 'shift_dates'

  id = db.Column(db.Integer, primary_key = True)
  project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable = False)
  date = db.Column(db.Date, nullable = False)

  shifts = db.relationship("Shift", backref = db.backref("shift_dates"), cascade = "all, delete-orphan")

  def to_schedule(self):
    return {
      "shiftDateId": self.id,
      "date": self.date.strftime("%m/%d/%Y"),
      "shifts": {shift.id:shift.to_dict() for shift in self.shifts}
    }

  def to_dict(self):
    return {
      "id": self.id,
      "date": self.date
    }


class Shift(db.Model):
  __tablename__ = 'shifts'

  id = db.Column(db.Integer, primary_key = True)
  shift_date_id = db.Column(db.Integer, db.ForeignKey('shift_dates.id'), nullable = False)
  position_id = db.Column(db.Integer, db.ForeignKey('positions.id'), nullable = False)
  quantity = db.Column(db.Integer, nullable = False)
  start_time = db.Column(db.Time, nullable = False)
  end_time = db.Column(db.Time, nullable = False)

  def to_dict(self):
    return {
      "id": self.id,
      "positionId": self.position_id,
      "quantity": self.quantity,
      "startTime": json.dumps(self.start_time, default=str),
      "endTime": json.dumps(self.end_time, default=str)
    }


class Version(db.Model):
  __tablename__ = 'versions'

  id = db.Column(db.Integer, primary_key = True)
  project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable = False)
  version = db.Column(db.Integer, nullable = False)
  data = db.Column(db.JSON)

  def to_dict(self):
    return {
      "id": self.id,
      "project_id": self.project_id,
      "version": self.version,
      "data": self.data
    }
