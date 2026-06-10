PORT := 3013

.PHONY: dev build deploy help

dev: ## Serve locally on port $(PORT)
	npx next dev --port $(PORT)

build: ## Build static export
	npx next build

deploy: ## Deploy to Firebase Hosting
	npm run build && firebase deploy --only hosting

help:
	@grep -E '^[a-zA-Z_-]+:.*##' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*##"}; {printf "  %-10s %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
