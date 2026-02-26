export function getRandomMeetingId(): string {
  // React Native doesn't have crypto.randomUUID, so we generate a simple random ID
  const chars = '0123456789abcdef';
  const segments = [];
  for (let i = 0; i < 3; i++) {
    let segment = '';
    for (let j = 0; j < 4; j++) {
      segment += chars[Math.floor(Math.random() * chars.length)];
    }
    segments.push(segment);
  }
  return segments.join('-');
}
