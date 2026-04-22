'use strict';

const levels = ['error', 'warn', 'info', 'debug'];

const log = (level, ...args) => {
  const ts = new Date().toISOString();
  console[level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'](`[${ts}] [${level.toUpperCase()}]`, ...args);
};

export const logger = {
  error: (...a) => log('error', ...a),
  warn: (...a) => log('warn', ...a),
  info: (...a) => log('info', ...a),
  debug: (...a) => log('debug', ...a),
};
