from textwrap import wrap
from fastapi import APIRouter
from fastapi.background import P

class Controller:
    router: APIRouter
