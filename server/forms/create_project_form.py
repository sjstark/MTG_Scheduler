from flask_wtf import FlaskForm
from wtforms import StringField, DateField, IntegerField
from wtforms.validators import DataRequired, ValidationError, Length
from server.models import Project


class CreateProjectForm(FlaskForm):
    title = StringField(
        'title',
        validators=[
            DataRequired(),
            Length(
                min=3,
                max=150,
                message="Title must be between 4 and 150 characters in length"
            )
        ]
    )

    startDate = StringField(
        'startDate',
        validators=[
            DataRequired()
        ]
    )

    endDate = StringField(
        'endDate',
        validators=[
            DataRequired()
        ]
    )

    clientId = IntegerField(
        'clientId',
        validators=[
            DataRequired()
        ]
    )
