FROM python:3.12.9
WORKDIR /app

COPY ./setup.py ./

RUN pip install -e .

COPY ./ ./

EXPOSE 8000

CMD [ "granian", "main:app", "--host", "0.0.0.0", "--port", "8000", "--interface", "asgi", "--workers", "8", "--loop", "uvloop", "--threads", "4" ]