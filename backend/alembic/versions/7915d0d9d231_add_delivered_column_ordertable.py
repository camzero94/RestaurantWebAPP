"""Add_delivered_column_OrderTable

Revision ID: 7915d0d9d231
Revises: 5687da5af87b
Create Date: 2023-04-17 10:38:14.943060

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7915d0d9d231'
down_revision = '5687da5af87b'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column('Order', sa.Column('delivered', sa.Boolean(), nullable=True))
    pass


def downgrade():
    op.drop_column('Order', 'delivered')
    pass
