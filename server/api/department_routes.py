from flask import Blueprint, jsonify, session, request
from flask_login import login_required

from server.forms import CreateDepartmentForm, CreatePositionForm

from server.models import Department, Position, db
from server.utils import validation_errors_to_error_dict

department_routes = Blueprint('department', __name__)


@department_routes.route('', methods=['GET'])
@login_required
def load_all_departments():

    args = request.args

    opt_query = args.get("query")

    if opt_query is not None:
        departments = Department.query.filter(Department.title.ilike(f'%{opt_query}%')).all()
    else:
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


@department_routes.route('/<department_id>/positions', methods=['POST'])
@login_required
def create_new_position(department_id):
    form = CreatePositionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    department = Department.query.get(department_id)

    if not department:
        return {'Errors': 'Cannot find the requested department'}, 404

    if form.validate_on_submit():
        base_rate = float(form.rate.data)

        new_position = Position(
            title=form.title.data,
            rate=base_rate,
            ot_rate=base_rate*1.5,
            dt_rate=base_rate*2
        )

        new_position.department = department

        db.session.add(new_position)
        db.session.commit()

        return jsonify((new_position.to_dict()))
    return {'errors': validation_errors_to_error_dict(form.errors)}, 400

@department_routes.route('/<department_id>', methods=['PUT'])
@login_required
def update_department(department_id):
    department = Department.query.get(department_id)

    form = CreateDepartmentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if department:

        if form.validate_on_submit():

            department.title = form.title.data

            db.session.commit()

            return jsonify(department.to_dict())

    return {'errors': 'Cannot find the requested resource'}, 404


@department_routes.route('/<department_id>', methods=['DELETE'])
@login_required
def delete_department(department_id):
    department = Department.query.get(department_id)

    if department:
        db.session.delete(department)
        db.session.commit()
        return 'success'
    return {'errors': 'Cannot find the requested resource'}, 404


@department_routes.route('/positions/<position_id>', methods=['DELETE'])
@login_required
def delete_position(position_id):
    position = Position.query.get(position_id)

    if position:
        db.session.delete(position)
        db.session.commit()
        return 'success'
    return {'errors': 'Cannot find the requested resource'}, 404


@department_routes.route('/positions/<position_id>', methods=['PUT'])
@login_required
def update_position(position_id):
    position = Position.query.get(position_id)

    form = CreatePositionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if position:

        if form.validate_on_submit():
            base_rate = float(form.rate.data)

            position.title = form.title.data
            position.rate = base_rate
            position.ot_rate = base_rate*1.5
            position.dt_rate = base_rate*2

            db.session.commit()

            return jsonify(position.to_dict())

    return {'errors': 'Cannot find the requested resource'}, 404
