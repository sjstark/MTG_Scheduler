from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField
from wtforms.validators import DataRequired, ValidationError, Length, NumberRange
from server.models import Project, Position



class CreatePositionForm(FlaskForm):
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

    rate = FloatField(
        'rate',
        validators=[
            DataRequired(),
            NumberRange(min=0)
        ]
    )
