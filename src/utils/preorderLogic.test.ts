import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validatePreorderInput,
  calculateOrderBreakdown,
  generateConfirmationCode,
  validatePropagandaSignup,
} from './preorderLogic.ts';

test('validatePreorderInput rejects empty or invalid fields and enforces ESRB 17+ age check', () => {
  const invalidResult = validatePreorderInput({
    fullName: 'J',
    email: 'invalid-email',
    edition: 'ultimate',
    platform: 'ps5',
    format: 'digital',
    region: 'US',
    ageVerified: false,
  });

  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.fullName);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.ageVerified);

  const validResult = validatePreorderInput({
    fullName: 'Lucia Caminos',
    email: 'lucia@vicecity.com',
    edition: 'ultimate',
    platform: 'ps5',
    format: 'digital',
    region: 'US',
    ageVerified: true,
  });

  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});
});

test('calculateOrderBreakdown computes accurate base price, shipping, and tax', () => {
  const digitalUltimate = calculateOrderBreakdown('ultimate', 'digital', 'US');
  assert.equal(digitalUltimate.basePrice, 99.99);
  assert.equal(digitalUltimate.shipping, 0);
  assert.equal(digitalUltimate.estimatedTax, 7.0);
  assert.equal(digitalUltimate.total, 106.99);

  const physicalStandard = calculateOrderBreakdown('standard', 'physical', 'US');
  assert.equal(physicalStandard.basePrice, 69.99);
  assert.equal(physicalStandard.shipping, 6.99);
  assert.equal(physicalStandard.total, Number((69.99 + 6.99 + 4.9).toFixed(2)));
});

test('generateConfirmationCode produces deterministic Rockstar VI reservation codes', () => {
  const code1 = generateConfirmationCode('jason@leonida.org', 'ultimate', 'ps5');
  const code2 = generateConfirmationCode('JASON@leonida.org ', 'ultimate', 'ps5');
  assert.equal(code1, code2);
  assert.match(code1, /^RSG-VI-ULT-PS5-[0-9A-F]{6}$/);
});

test('validatePropagandaSignup validates email and ESRB Mature 17+ birth year', () => {
  assert.equal(validatePropagandaSignup('bad', '1998').valid, false);
  assert.equal(validatePropagandaSignup('fan@rockstargames.com', '2015').valid, false);
  assert.equal(validatePropagandaSignup('fan@rockstargames.com', '1998').valid, true);
});
