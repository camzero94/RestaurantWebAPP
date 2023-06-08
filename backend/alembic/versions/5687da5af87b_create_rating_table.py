"""Create Rating Table

Revision ID: 5687da5af87b
Revises: 97a459a323bd
Create Date: 2023-02-10 18:46:12.071931

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import ForeignKey
from sqlalchemy.types import DateTime


# revision identifiers, used by Alembic.
revision = '5687da5af87b'
down_revision = '97a459a323bd'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "Rating",
        sa.Column("ratingId", sa.Integer, primary_key=True,autoincrement=True),
        sa.Column("userId", sa.Integer,ForeignKey("User.id"), primary_key=True),
        sa.Column("itemId", sa.Integer,ForeignKey("Item.itemId"), primary_key=True),
        sa.Column("projectId", sa.Integer,ForeignKey("Project.projectId"), primary_key=True),
        sa.Column("rating", sa.Integer),
        sa.Column("createdAtTime", sa.DateTime(timezone=False)),
        sa.Column("updatedAtTime", sa.DateTime(timezone=False)),
            )
    pass

def downgrade():
    op.drop_table("Rating"),
    pass
