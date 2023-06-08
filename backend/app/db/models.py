from sqlalchemy import Column, Boolean, ForeignKey, Integer, String, Table
from sqlalchemy.orm import (relationship)
from app.db.session import Base
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.types import DateTime , Float, Text, SmallInteger

# Association Table Order - User - Project Relationship many to many
# Keeps tracks of the state of the orders by user and restaurant



class Rating(Base):
    __tablename__ = "Rating"

    ratingId = Column(Integer, primary_key=True, index=True)
    userId= Column(ForeignKey("User.id",ondelete="CASCADE"), primary_key=True)
    itemId= Column(ForeignKey("Item.itemId",ondelete="CASCADE"), primary_key=True)
    projectId= Column(ForeignKey("Project.projectId",ondelete="CASCADE"), primary_key=True)
    user = relationship("UserDB",back_populates="ratings")
    item = relationship("ItemDB",back_populates="ratings")
    project= relationship("ProjectDB",back_populates="ratings")
    rating= Column(Integer,nullable=False)
    createdAtTime = Column(DateTime(timezone=False))
    updatedAtTime= Column(DateTime(timezone=False))

class Transaction(Base):
    __tablename__ = "Transaction"

    transactionId = Column(Integer, primary_key=True, index=True)
    userId= Column(ForeignKey("User.id",ondelete="CASCADE"), primary_key=True)
    orderId= Column(ForeignKey("Order.orderId",ondelete="CASCADE"), primary_key=True)
    projectId= Column(ForeignKey("Project.projectId",ondelete="CASCADE"), primary_key=True)
    user = relationship("UserDB",back_populates="ordersTrans")
    order = relationship("OrderDB",back_populates="ordersTrans")
    project = relationship("ProjectDB",back_populates="ordersTrans")
    code = Column(String,nullable=False)
    type = Column(SmallInteger) # Credit or Debit
    status = Column(SmallInteger,nullable=False) #New,Cancelled,Failed,Pending,Declined,Rejected and Success
    createdAtTime = Column(DateTime(timezone=False))
    updatedAtTime= Column(DateTime(timezone=False))
    content = Column(Text)


# Association Table Order - Item Relationship many to many
class OrderItem(Base):
    __tablename__ = "OrderItem"

    orderItemId = Column(Integer, primary_key=True, index=True,unique=True)
    orderId= Column(ForeignKey("Order.orderId"), primary_key=True)
    itemId= Column(ForeignKey("Item.itemId",ondelete="CASCADE"), primary_key=True)
    item = relationship("ItemDB",back_populates="orders")
    order = relationship("OrderDB",back_populates="items")
    nameOrderItem = Column(String)
    price = Column(Float,nullable=False)
    discount = Column(Float)
    quantity = Column(Float)
    unit = Column(Integer)
    createdAtTime = Column(DateTime(timezone=False))
    updatedAtTime= Column(DateTime(timezone=False))
    content = Column(Text)
    #Rating Table
    # ratings= relationship("Rating",back_populates="orderItem",cascade="all,delete")

# Association Table Menu - Item Relationship Many to Many
class MenuItem(Base):
    __tablename__ = "MenuItem"
    
    menuId= Column(ForeignKey("Menu.menuId"), primary_key=True)
    itemId= Column(ForeignKey("Item.itemId",ondelete="CASCADE"), primary_key=True)
    item= relationship("ItemDB",back_populates="menus")
    menu= relationship("MenuDB",back_populates="items")


# Association Table Ingredient - Item Relationship Many to Many
class RecipeDB(Base):
    __tablename__ = "Recipe"
    ingredientId= Column(ForeignKey("Ingredient.ingredientId"), primary_key=True)
    itemId= Column(ForeignKey("Item.itemId",ondelete="CASCADE"), primary_key=True)

    quantity = Column(Float,nullable=False)
    unit = Column(String,nullable=False)
    instructions= Column(String)
    item= relationship("ItemDB",back_populates="ingredients")
    ingredient= relationship("IngredientDB",back_populates="items")

#User-Project Realationship Many-to-Many
class User_Project(Base):
    __tablename__ = "User_Project"
    userId= Column(ForeignKey("User.id"), primary_key=True)
    projectId= Column(ForeignKey("Project.projectId"), primary_key=True)
    extraData= Column(String)
    user= relationship("UserDB",back_populates="projects")
    project= relationship("ProjectDB",back_populates="users")


class UserDB(Base):
    __tablename__ = "User"
    # __table_args__ = {"extend_existing": True}
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    firstname = Column(String)
    lastname = Column(String)
    email = Column(String, nullable=False, index=True, unique=True)
    password_hash = Column(String, nullable=False)
    cellphone = Column(Integer)
    companyname = Column(String)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    is_leader = Column(Boolean, default=False)
    projects = relationship("User_Project",back_populates="user")
    orders = relationship("OrderDB",back_populates="user")
    ordersTrans = relationship("Transaction",back_populates="user",cascade="all,delete")
    ratings= relationship("Rating",back_populates="user",cascade="all,delete")

    def __repr__(self):
        return f"<UserId :{self.id}, username: {self.username}>"

class ProjectDB(Base):
    __tablename__ = "Project"
    projectId= Column(Integer, primary_key=True, index=True)
    projectName = Column(String, nullable=False)
    nameOfLeader = Column(String)
    description = Column(String)
    createdAtTime = Column(DateTime(timezone=False))
    updatedAtTime= Column(DateTime(timezone=False))
    users= relationship("User_Project",back_populates="project", cascade="all,delete")
    ingredients = relationship("IngredientDB",back_populates="project", cascade="all,delete")
    items= relationship("ItemDB",back_populates="project", cascade="all,delete")
    menus= relationship("MenuDB",back_populates="project", cascade="all,delete")
    orders= relationship("OrderDB",back_populates="project", cascade="all,delete")
    ordersTrans = relationship("Transaction",back_populates="project",cascade="all,delete")
    ratings= relationship("Rating",back_populates="project",cascade="all,delete")


    def __repr__(self):
        return f"<ProjectId:{self.projectId}, projectname: {self.projectName}>"

class IngredientDB(Base):
    __tablename__ = "Ingredient"
    ingredientId= Column(Integer, primary_key=True, index=True,autoincrement=True)
    nameIngredient= Column(String, nullable=False)
    quantity = Column(Integer)
    unit = Column(String)
    summary= Column(String)
    createdAtTime = Column(DateTime(timezone=False))
    updatedAtTime= Column(DateTime(timezone=False))
    image_url = Column(String)
    projectId = Column(ForeignKey("Project.projectId")) 
    project = relationship("ProjectDB", back_populates="ingredients")
    items= relationship("RecipeDB",back_populates="ingredient", cascade="all,delete")



    def __repr__(self):
        return f"<IngredientId:{self.ingredientId}, ingredientName: {self.nameIngredient}>"
    

class ItemDB(Base):
    __tablename__ = "Item"
    itemId= Column(Integer, primary_key=True, index=True,autoincrement=True)
    nameItem= Column(String, nullable=False)
    quantity = Column(Integer)
    unit = Column(String)
    type = Column(String)
    cooking = Column(Boolean)
    price = Column(Float,nullable=False)
    summary= Column(String)
    deleted = Column(Boolean,nullable=False)
    image_url = Column(String)
    createdAtTime = Column(DateTime(timezone=False))
    updatedAtTime= Column(DateTime(timezone=False))

    #Project Foreign Key
    projectId = Column(ForeignKey("Project.projectId"))
    project = relationship("ProjectDB", back_populates="items")

    # Many to Many relationship with Ingredient Table (Many to One with Recipe Table) 
    ingredients= relationship("RecipeDB",back_populates="item",cascade="all,delete")
    # Many to Many relationship with Menu Table (Many to One with MenuItem Table) 
    menus= relationship("MenuItem",back_populates="item",cascade="all,delete")
    # Many to Many relationship with Order Table (Many to One with OrderItem Table) 
    orders = relationship("OrderItem",back_populates="item",cascade="all,delete")

    # Many to Many relationship with Order Table (Many to One with OrderItem Table) 
    ratings= relationship("Rating",back_populates="item",cascade="all,delete")

    def __repr__(self):
        return f"<Item:{self.itemId}, itemName: {self.nameItem}>"
   

class MenuDB(Base):
    __tablename__ = "Menu"
    menuId= Column(Integer, primary_key=True, index=True,autoincrement=True)
    nameMenu= Column(String, nullable=False)
    description= Column(String)
    type = Column(String)
    summary= Column(String)
    image_url = Column(String)
    is_active = Column(Boolean, default=False)
    createdAtTime = Column(DateTime(timezone=False))
    updatedAtTime= Column(DateTime(timezone=False))

    #Many to One Relationship with Project Table 
    projectId = Column(ForeignKey("Project.projectId"))
    project = relationship("ProjectDB", back_populates="menus")
    # Many to Many relationship with Item Table (Many to One with MenuItem Table)
    items= relationship("MenuItem",back_populates="menu",cascade="all,delete")

    def __repr__(self):
        return f"<Menu:{self.menuId}, Menu Name: {self.nameMenu}>"

class OrderDB(Base):
    __tablename__="Order"
    orderId = Column(Integer, primary_key=True, index=True,autoincrement=True)
    token = Column(String,nullable=False)
    subTotal = Column(Float,nullable=False)
    tax = Column(Float)
    total = Column(Float, nullable=False)
    globalDiscount = Column(Float)
    email = Column(String)
    createdAtTime = Column(DateTime(timezone=False))
    updatedAtTime= Column(DateTime(timezone=False))
    content = Column(Text)
    delivered = Column(Boolean,default=False)
    deleted = Column(Boolean,default=False)
    #Many to One Relationship Order and User
    userId= Column(ForeignKey("User.id"))
    user = relationship("UserDB", back_populates="orders")
    #Many to One Relationship Order and Project 
    projectId = Column(ForeignKey("Project.projectId"))
    project = relationship("ProjectDB", back_populates="orders")

    #Many to Many Relationship Order and Item 
    items= relationship("OrderItem",back_populates="order",cascade="all,delete")
    #Transaction Table
    ordersTrans = relationship("Transaction",back_populates="order",cascade="all,delete")
    












    
