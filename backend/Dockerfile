FROM python:3.8-alpine

WORKDIR /usr/src/app/

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt .

RUN \
    apk add --no-cache postgresql-libs libjpeg && \
    apk add --update --no-cache --virtual .build-deps \
        gcc g++ libffi-dev musl-dev postgresql-dev jpeg-dev zlib-dev && \
    pip install -r requirements.txt --no-cache-dir && \
    apk del --purge .build-deps

COPY . .

ENTRYPOINT [ "./entrypoint.sh" ]