.PHONY: manual-run manual-run-backend manual-run-frontend manual-install manual-update

include .dev.env

BACKEND_PATH = ./backend
FRONTEND_PATH = ./frontend

DEFAULT_VENV_PATH = $(BACKEND_PATH)/venv
PYTHON_VENV_PATH = $(if $(VENV_PATH), $(VENV_PATH), $(DEFAULT_VENV_PATH))
PYTHON_VENV_FLAG = $(PYTHON_VENV_PATH)/.make_install_flag

NODE_MODULES_PATH = $(FRONTEND_PATH)/node_modules
NODE_MODULES_FLAG = $(NODE_MODULES_PATH)/.make_install_flag

all: manual-run

manual-run: manual-run-backend manual-run-frontend

manual-update: manual-install manual-run

manual-run-backend:
	. $(PYTHON_VENV_PATH)/bin/activate && python $(BACKEND_PATH)/manage.py runserver

manual-run-frontend:
	cd $(FRONTEND_PATH) && npm run start

manual-install: $(PYTHON_VENV_FLAG) $(NODE_MODULES_FLAG)

$(PYTHON_VENV_FLAG): $(BACKEND_PATH)/requirements.txt
	[ -d $(PYTHON_VENV_PATH) ] || python3 -m venv $(DEFAULT_VENV_PATH)
	. $(PYTHON_VENV_PATH)/bin/activate && pip install -r $(BACKEND_PATH)/requirements.txt
	touch $(PYTHON_VENV_FLAG)

$(NODE_MODULES_FLAG): $(FRONTEND_PATH)/package.json
	cd $(FRONTEND_PATH) && npm i
	touch $(NODE_MODULES_FLAG)

clean:
	rm -rf $(PYTHON_VENV_PATH)