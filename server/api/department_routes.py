from flask import Blueprint, jsonify, session, request
from flask_login import login_required

from server.forms import CreateDepartmentForm

from server.models import Department, Position, db
from server.utils import validation_errors_to_error_dict

department_routes = Blueprint('department', __name__)


@department_routes.route('', methods=['GET'])
@login_required
def load_all_departments():

    departments = Department.query.all()

    departments = [department.to_dict() for department in departments]

    return jsonify(departments)


@department_routes.route('', methods=['POST'])
@login_required
def create_new_department():

    form = CreateDepartmentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_department = Department(
            title= form.title.data
        )

        db.session.add(new_department)
        db.session.commit()

        return jsonify(new_department.to_dict())
    return {'errors': validation_errors_to_error_dict(form.errors)}, 400
