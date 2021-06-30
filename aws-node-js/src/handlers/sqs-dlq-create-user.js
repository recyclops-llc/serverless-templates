export default async function handler(event) {
  // use Sentry
  return { message: 'processed', event };
}
