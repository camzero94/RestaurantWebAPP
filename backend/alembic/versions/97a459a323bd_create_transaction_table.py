"""create Transaction Table

Revision ID: 97a459a323bd
Revises: 1f98018acb90
Create Date: 2023-01-18 14:26:28.540449

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import ForeignKey,SmallInteger



# revision identifiers, used by Alembic.
revision = '97a459a323bd'
down_revision = '1f98018acb90'
branch_labels = None
depends_on = None


def upgrade():
   # Create Transaction Table 
    op.create_table(
        "Transaction",
        sa.Column("transactionId", sa.Integer, primary_key=True,autoincrement=True),
        sa.Column("userId",sa.Integer,ForeignKey("User.id"), primary_key=True),
        sa.Column("orderId",sa.Integer,ForeignKey("Order.orderId"), primary_key=True),
        sa.Column("projectId",sa.Integer,ForeignKey("Project.projectId"), primary_key=True),
        sa.Column("code", sa.String(200), nullable=False),
        sa.Column("type", sa.SmallInteger),
        sa.Column("status", sa.SmallInteger,nullable=False),
        sa.Column("createdAtTime", sa.DateTime(timezone=False)),
        sa.Column("updatedAtTime", sa.DateTime(timezone=False)),
        sa.Column("content", sa.String(300)),
    ),
    pass


def downgrade():
    op.drop_table('Transaction')
    pass
