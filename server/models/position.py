from .db import db

class Department(db.Model):
  __tablename__ = 'departments'

  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String(150), nullable = Fasle, unique = True)

  positions = db.relationship("Position", backref = db.backref("department", cascade="all, delete-orphans"))


  def to_dict(self):
      return {
          "id": self.id,
          "title": self.title
      }


class Position(db.Model):
  __tablename__ = 'positions'

  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String(150), nullable = False, unique = True)
  department_id = db.Column(db.Integer, nullable = False)
  rate = db.Column(db.Float(precision = 2), nullable = False)
  ot_rate = db.Column(db.Float(precision = 2), nullable = False)
  dt_rate = db.Column(db.Float(precision = 2), nullable = False)

  shifts = db.relationship("Shift", backref = db.backref("positions", cascade = "all, delete-orphans")

  def to_dict(self):
      return {
          "id": self.id,
          "title": self.title,
          "departmentId": self.department_id,
          "rate": self.rate,
          "OTRate": self.ot_rate,
          "DTRate": self.dt_rate
      }
