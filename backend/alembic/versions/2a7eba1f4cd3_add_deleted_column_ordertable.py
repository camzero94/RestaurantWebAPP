"""Add_deleted_column_OrderTable

Revision ID: 2a7eba1f4cd3
Revises: 7915d0d9d231
Create Date: 2023-04-17 15:12:54.600053

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2a7eba1f4cd3'
down_revision = '7915d0d9d231'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('Order', sa.Column('deleted', sa.Boolean(), nullable=True))
    pass


def downgrade():
    op.drop_column('Order', 'deleted')
    pass
