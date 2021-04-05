from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from server.models import Project, Department


def department_exists(form, field):
    print("Checking if department exists", field.data)
    title = field.data
    department = Department.query.filter(Department.title == title).first()
    if department:
        raise ValidationError("Department already exists.")


class CreateDepartmentForm(FlaskForm):
    title = StringField(
        'title',
        validators=[
            DataRequired(),
            Length(
                min=3,
                max=150,
                message="Title must be between 4 and 150 characters in length"
            ),
            department_exists
        ]
    )
