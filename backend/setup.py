from setuptools import setup, find_packages

setup(
    name="my_project",
    version="0.1",
    packages=find_packages(where="./"),
    package_dir={"": "./"},
    install_requires = [
        "bcrypt==3.2.0",
        "fastapi==0.115.11",
        "uvicorn[standart]",
        "pyjwt==2.9.0",
        "granian==1.6.4",
        "colorama",
        "validators==0.34.0",
        "cryptography==46.0.3",
        "sqlalchemy==2.0.44",
        "dotenv==0.9.9",
        "asyncpg==0.30.0",
        "redis==7.1.0"
    ]
)