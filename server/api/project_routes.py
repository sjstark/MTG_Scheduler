from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime
from dateutil.relativedelta import relativedelta

from server.models import Project, User, db
from server.utils import validation_errors_to_error_messages

from server.forms import CreateProjectForm

project_routes = Blueprint('project', __name__)


@project_routes.route('/', methods=["GET"])
@login_required
def get_all_projects():

    args = request.args

    today = datetime.today()

    opt_start = args.get("start")
    opt_months = args.get("months")

    start = opt_start if opt_start is not None else f"{today.year}-{today.month}"
    months = int(opt_months) if opt_months is not None else 5

    [yearStr, monthStr] = start.split("-")
    startDate = datetime(int(yearStr), int(monthStr), 1)
    endDate = startDate + relativedelta(months=months)

    projects = Project.query.filter(Project.start_date >= startDate.strftime("%Y-%m-%d")).filter( Project.start_date < endDate.strftime("%Y-%m-%d")).order_by(Project.start_date).all()

    months = {}
    current = startDate
    while current < endDate:
        months[(current.strftime("%B %Y"))] = []
        current += relativedelta(months=1)

    for project in projects:
        months[project.start_date.strftime("%B %Y")].append(project.to_dict())

    data = {"projects": months}
    return jsonify(data)


@project_routes.route('/', methods=["POST"])
@login_required
def create_new_project():
    form = CreateProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    print(form.data)

    if form.validate_on_submit():
        project = Project(
            title = form.title.data,
            start_date = form.startDate.data,
            end_date = form.endDate.data,
            client_id = form.clientID.data
        )

        db.session.add(project)
        db.session.commit()

        print(project)

        return project.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}
