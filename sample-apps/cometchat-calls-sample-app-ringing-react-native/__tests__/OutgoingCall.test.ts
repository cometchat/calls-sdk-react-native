import { describe, expect, it } from '@jest/globals';
import { OutgoingCall } from '../src/calls/OutgoingCall';

const ringing = (connected = false) => {
  const call = new OutgoingCall();
  call.initiated('s1');
  if (connected) {
    call.participantConnected();
  }
  return call;
};

describe('OutgoingCall', () => {
  it('shows Calling… until the callee device connects, then Ringing…', () => {
    const call = new OutgoingCall();
    expect(call.statusText).toBe('Calling…');
    expect(call.canCancel).toBe(false);
    expect(call.initiated('s1')).toBe(true);
    expect(call.statusText).toBe('Calling…');
    expect(call.canCancel).toBe(true);
    expect(call.participantConnected()).toBe(true);
    expect(call.statusText).toBe('Ringing…');
  });

  it('ignores duplicate inputs', () => {
    const call = ringing(true);
    expect(call.initiated('s2')).toBe(false);
    expect(call.participantConnected()).toBe(false);
    expect(call.participantJoined()).toBe(true);
    expect(call.participantJoined()).toBe(false);
    expect(call.sessionId).toBe('s1');
  });

  it('cannot be cancelled or timed out before a session exists', () => {
    const call = new OutgoingCall();
    expect(call.cancel()).toBe(false);
    expect(call.timeout()).toBe(false);
    expect(call.initiateFailed()).toBe(true);
    expect(call.statusText).toBe('Call failed');
  });

  it('lets a cancel beat a late answer', () => {
    const call = ringing(true);
    expect(call.cancel()).toBe(true);
    expect(call.participantJoined()).toBe(false);
    expect(call.state).toEqual({ name: 'ended', sessionId: 's1', reason: 'cancelled' });
  });

  it.each([
    ['rejected', 'Declined'],
    ['busy', 'Busy'],
    ['unanswered', 'No answer'],
    ['ended', 'Call ended'],
  ])('maps a server status of %s to %s', (status, text) => {
    const call = ringing(true);
    expect(call.serverEnded(status)).toBe(true);
    expect(call.statusText).toBe(text);
  });

  it('shows No answer on the timeout', () => {
    const call = ringing();
    expect(call.timeout()).toBe(true);
    expect(call.statusText).toBe('No answer');
  });

  it('treats a close after the callee connected as the call ending', () => {
    const call = ringing(true);
    expect(call.sessionClosed()).toBe(true);
    expect(call.statusText).toBe('Call ended');
    expect(call.needsServerEnd).toBe(false);
  });

  it('treats a close before the callee connected as a failure the caller must withdraw', () => {
    const call = ringing();
    expect(call.sessionClosed()).toBe(true);
    expect(call.statusText).toBe('Call failed');
    expect(call.needsServerEnd).toBe(true);
  });

  it('ignores a close once joined', () => {
    const call = ringing(true);
    call.participantJoined();
    expect(call.sessionClosed()).toBe(false);
  });
});
