from server.models import *
import datetime

# Adds a demo user, you can add other users here if you want
def seed_projects():

    example_project = Project(
        title = "A New Project",
        start_date = datetime.date(2021,5,1),
        end_date = datetime.date(2021,5,4),
    )

    example_client = Client(name = "Nike")
    example_contact = Contact(
        first_name = "John",
        last_name = "Deer",
        email = "john.d@gmail.com"
    )
    example_contact.company = example_client

    example_project.client = example_client
    example_project.contact = example_contact

    db.session.add(example_project)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_projects():
    db.session.execute('TRUNCATE projects;')
    db.session.commit()
