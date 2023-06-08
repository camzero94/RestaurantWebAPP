"""create Orders Table,OrderItem Table and add deleted column to Item Table 

Revision ID: dbdf7859543c
Revises: 6b15e777acec
Create Date: 2023-01-17 16:19:21.941652

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import ForeignKey
from sqlalchemy.types import DateTime


# revision identifiers, used by Alembic.
revision = 'dbdf7859543c'
down_revision = '6b15e777acec'
branch_labels = None
depends_on = None


def upgrade():
   # Create Order Table 
    op.create_table(
        "Order",
        sa.Column("orderId", sa.Integer, primary_key=True,autoincrement=True),
        sa.Column("token", sa.String(600), nullable=False),
        sa.Column("tax", sa.Float),
        sa.Column("subTotal", sa.Float),
        sa.Column("total", sa.Float),
        sa.Column("globalDiscount",sa.Float),
        sa.Column("email",sa.String(100)),
        sa.Column("createdAtTime", sa.DateTime(timezone=False)),
        sa.Column("updatedAtTime", sa.DateTime(timezone=False)),
        sa.Column("content", sa.String(300)),
    ),
    op.create_table(
        "OrderItem",
        sa.Column("orderItemId",sa.Integer, primary_key=True,autoincrement=True,unique=True),
        sa.Column("itemId",sa.Integer,ForeignKey("Item.itemId"), primary_key=True),
        sa.Column("orderId",sa.Integer,ForeignKey("Order.orderId"), primary_key=True),
        sa.Column("nameOrderItem",sa.String),
        sa.Column("price",sa.Float,nullable=False),
        sa.Column("quantity",sa.Float,nullable=False),
        sa.Column("unit",sa.String(10)),
        sa.Column("discount",sa.Float),
        sa.Column("createdAtTime", sa.DateTime(timezone=False)),
        sa.Column("updatedAtTime", sa.DateTime(timezone=False)),
        sa.Column("content",sa.String),
    )
    op.add_column('Item',sa.Column('deleted',sa.Boolean))
    pass

    # price = Column(Float,nullable=False)
    # discount = Column(Float)
    # quantity = Column(Float)
    # unit = Column(Integer)
    # createdAtTime = Column(DateTime(timezone=False))
    # updatedAtTime= Column(DateTime(timezone=False))
    # content = Column(Text)

def downgrade():
    op.drop_table('OrderItem')
    op.drop_table('Order')
    op.drop_column('Item','deleted')
    pass
