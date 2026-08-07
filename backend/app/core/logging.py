import logging

from app.core.constants import DEFAULT_LOGGER_NAME


def get_logger() -> logging.Logger:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s | %(levelname)s | %(message)s",
    )

    return logging.getLogger(DEFAULT_LOGGER_NAME)


logger = get_logger()