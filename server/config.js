const convict = require('convict');
const { tmpdir } = require('os');
const path = require('path');

const conf = convict({
  s3_bucket: {
    format: String,
    default: '',
    env: 'S3_BUCKET'
  },
  gcs_bucket: {
    format: String,
    default: '',
    env: 'GCS_BUCKET'
  },
  expire_times_seconds: {
    format: Array,
    default: [300, 3600, 86400, 604800, 86400 * 30, 86400 * 90, 86400 * 180, 86400 * 365],
    env: 'EXPIRE_TIMES_SECONDS'
  },
  default_expire_seconds: {
    format: Number,
    default: 86400,
    env: 'DEFAULT_EXPIRE_SECONDS'
  },
  max_expire_seconds: {
    format: Number,
    default: 86400 * 7,
    env: 'MAX_EXPIRE_SECONDS'
  },
  anon_max_expire_seconds: {
    format: Number,
    default: 86400 * 365,
    env: 'ANON_MAX_EXPIRE_SECONDS'
  },
  download_counts: {
    format: Array,
    default: [1, 2, 3, 4, 5, 10, 20, 50, 100, 1000, 5000, Number.MAX_SAFE_INTEGER],
    env: 'DOWNLOAD_COUNTS'
  },
  max_downloads: {
    format: Number,
    default: 1024,
    env: 'MAX_DOWNLOADS'
  },
  anon_max_downloads: {
    format: Number,
    default: Number.MAX_SAFE_INTEGER,
    env: 'ANON_MAX_DOWNLOADS'
  },
  max_files_per_archive: {
    format: Number,
    default: 64,
    env: 'MAX_FILES_PER_ARCHIVE'
  },
  max_archives_per_user: {
    format: Number,
    default: 1024,
    env: 'MAX_ARCHIVES_PER_USER'
  },
  redis_host: {
    format: String,
    default: 'localhost',
    arg:'redis_host',
    env: 'REDIS_HOST'
  },
  redis_port: {
    format: String,
    default: '',
    arg:'redis_port',
    env: 'redis_port'
  },
  redis_password: {
    format: String,
    default: '',
    arg:'redis_password',
    env: 'redis_password'
  },
  redis_event_expire: {
    format: Boolean,
    default: false,
    env: 'REDIS_EVENT_EXPIRE'
  },
  listen_address: {
    format: 'ipaddress',
    default: '0.0.0.0',
    env: 'IP_ADDRESS'
  },
  listen_port: {
    format: 'port',
    default: 1443,
    arg: 'port',
    env: 'PORT'
  },
  amplitude_id: {
    format: String,
    default: '',
    env: 'AMPLITUDE_ID'
  },
  analytics_id: {
    format: String,
    default: '',
    env: 'GOOGLE_ANALYTICS_ID'
  },
  sentry_id: {
    format: String,
    default: '',
    env: 'SENTRY_CLIENT'
  },
  sentry_dsn: {
    format: String,
    default: '',
    env: 'SENTRY_DSN'
  },
  env: {
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  max_file_size: {
    format: Number,
    default: 1024 * 1024 * 1024 * 2.5,
    env: 'MAX_FILE_SIZE'
  },
  anon_max_file_size: {
    format: Number,
    default: 1024 * 1024 * 1024 * 10,
    env: 'ANON_MAX_FILE_SIZE'
  },
  l10n_dev: {
    format: Boolean,
    default: false,
    env: 'L10N_DEV'
  },
  base_url: {
    format: 'url',
    default: 'https://send.firefox.com',
    env: 'BASE_URL'
  },
  file_dir: {
    format: 'String',
    default: `${path.resolve(__dirname,'../sharedFile')}`,
    env: 'FILE_DIR'
  },
  fxa_url: {
    format: 'url',
    default: 'https://send-fxa.dev.lcip.org',
    env: 'FXA_URL'
  },
  fxa_client_id: {
    format: String,
    default: '', // disabled
    env: 'FXA_CLIENT_ID'
  },
  fxa_key_scope: {
    format: String,
    default: 'https://identity.mozilla.com/apps/send',
    env: 'FXA_KEY_SCOPE'
  }
});

// Perform validation
conf.validate({ allowed: 'strict' });

const props = conf.getProperties();
module.exports = props;

console.log('app config',props)
