from flask import Blueprint, jsonify, session, request
from flask_login import login_required

from server.models import Department, Position, db
from server.utils import validation_errors_to_error_messages

department_routes = Blueprint('department', __name__)


@department_routes.route('', methods=['GET'])
@login_required
def load_all_departments():

    departments = Department.query.all()

    departments = [department.to_dict() for department in departments]

    return jsonify(departments)
