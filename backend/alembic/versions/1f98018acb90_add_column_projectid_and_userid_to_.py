"""Add column projectId and userId to Order Table

Revision ID: 1f98018acb90
Revises: dbdf7859543c
Create Date: 2023-01-17 17:34:52.588123

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import ForeignKey


# revision identifiers, used by Alembic.
revision = '1f98018acb90'
down_revision = 'dbdf7859543c'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('Order',sa.Column('userId',sa.Integer,ForeignKey("User.id"))),
    op.add_column('Order',sa.Column('projectId',sa.Integer,ForeignKey("Project.projectId"))),
    pass


def downgrade():
    op.drop_column('Order','userId')
    op.drop_column('Order','projectId')
    pass
