from .db import db

class Project(db.Model):
  __tablename__ = 'projects'

  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String(100), nullable=False)
  start_date = db.Column(db.Date, nullable=False)
  end_date = db.Column(db.Date, nullable=False)

  client_id = db.Column(db.Integer)
  contact_id = db.Column(db.Integer)

  quote_issued = db.Column(db.Date)
  quote_valid = db.Column(db.Date)

  venue = db.Column(db.String(255))

  admin_notes = db.Column(db.Text)

  shift_dates = db.relationship("Shift_Date", backref = db.backref("project", cascade = "all, delete-orphans"))

  versions = db.relationship("Version", backref = db.backref("project", cascade = "all, delete-orphans"))

  def to_dict(self):
    return {
      "id": self.id,
      "title": self.title,
      "startDate": self.start_date,
      "endDate": self.end_date,
    }


class Shift_Date(db.Model):
  __tablename__ = 'shift_dates'

  id = db.Column(db.Integer, primary_key = True)
  project_id = db.Column(db.Integer, nullable = False)
  date = db.Column(db.Date, nullable = False)

  shifts = db.relationship("Shift", backref = db.backref("shift_dates", cascade = "all, delete-orphans"))

  def to_dict(self):
    return {
      "id": self.id,
      "date": self.date
    }


class Shift(db.model):
  __tablename__ = 'shifts'

  id = db.Column(db.Integer, primary_key = True)
  shift_date_id = db.Column(db.Integer, nullable = False)
  position_id = db.Column(db.Integer, nullable = False)
  quantity = db.Column(db.Integer, nullable = False)
  start_time = db.Column(db.Time, nullable = False)
  end_time = db.Column(db.Time, nullable = False)

  def to_dict(self):
    return {
      "id": self.id,
      "positionId": self.position_id,
      "quantity": self.quantity,
      "startTime": self.start_time,
      "endTime": self.end_time
    }


class Version(db.model):
  __tablename__ = 'versions'

  id = db.Column(db.Integer, primary_key = True)
  project_id = db.Column(db.Integer, nullable = False)
  version = db.Column(db.Integer, nullable = False)
  data = db.Column(db.JSON)

  def to_dict(self):
    return {
      "id": self.id,
      "project_id": self.project_id,
      "version": self.version
      "data": self.data
    }
