from setuptools import setup, find_packages

setup(
    name="my_project",
    version="0.1",
    packages=find_packages(where="./"),
    package_dir={"": "./"},
    install_requires = [
        "bcrypt==3.2.0",
        "peewee==3.17.9",
        "fastapi==0.115.11",
        "pyjwt==2.9.0",
        "granian==1.6.4",
        "validators==0.34.0",
        "cryptography==46.0.3",
        "peewee-async[psycopg]"
    ]
)