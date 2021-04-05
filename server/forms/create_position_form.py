from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange
from server.models import Project, Position


def position_exists(form, field):
    print("Checking if department exists", field.data)
    title = field.data
    position = Position.query.filter(Position.title == title).first()
    if department:
        raise ValidationError("Department already exists.")


class CreatePositionForm(FlaskForm):
    title = StringField(
        'title',
        validators=[
            DataRequired(),
            Length(
                min=3,
                max=150,
                message="Title must be between 4 and 150 characters in length"
            ),
            position_exists
        ]
    )

    department_id = IntegerField(
        'departmentId',
        validators=[
            DataRequired(),
            NumberRange(min=0)
        ]
    )

    base_rate = FloatField(
        'rate',
        validators=[
            DataRequired(),
            NumberRange(min=0)
        ]
    )
