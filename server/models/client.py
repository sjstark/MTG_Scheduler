  from .db import db

  class Client(db.Model):
  __tablename__ = 'clients'

  id = db.Column(db.Integer, primary_key = True)
  name = db.Column(db.String(100), nullable = False)

  contacts = db.relationship("Contact", backref = db.backref("company", cascade = "all, delete-orphans"))

  projects = db.relationship("Project", backref = db.backref("client", cascade = "all, delete-orphans"))

  def to_dict(self):
    return {
      "id": self.id,
      "name": self.name
    }


class Contact(db.Model):
  __tablename__ = 'contacts'

  id = db.Column(db.Integer, primary_key = True)
  company_id = db.Column(db.Integer, nullable = False)
  first_name = db.Column(db.String(50), nullable = False)
  last_name = db.Column(db.String(50))
  email = db.Column(db.String(255))

  projects = db.relationship("Project", backref = db.backref("client_contact", cascade = "all, delete-orphans"))

  def to_dict(self):
    return {
      "id": self.id,
      "companyId": self.company_id,
      "firstName": self.first_name,
      "lastName": self.last_name,
      "email": self.email
    }
