import { parseDragDropAnswer, pickLineMatchIds } from './drag-drop-answer.js';

describe('parseDragDropAnswer', () => {
  it('keeps wrapped packet descriptions inside numbered groups', () => {
    const parsed = parseDragDropAnswer([
      'Permitted:',
      '+ source IP: 207.16.32.14,',
      'destination application: http',
      '+ source IP: 207.16.15.9,',
      'destination port: 23',
      '+ source IP: 207.16.16.14,',
      'destination port: 53',
      '',
      'Denied:',
      '+ source IP: 207.16.14.7,',
      'destination port: 80',
      '+ source IP: 207.16.13.14,',
      'destination application: http',
    ].join('\n'), 1307);

    expect(parsed).not.toBeNull();
    expect(parsed?.matchStyle).toBe('numbers');
    expect(parsed?.choices).toEqual(['Permitted', 'Denied']);
    expect(parsed?.items).toHaveLength(5);
    expect(parsed?.items).toEqual(expect.arrayContaining([
      'source IP: 207.16.32.14, destination application: http',
      'source IP: 207.16.15.9, destination port: 23',
      'source IP: 207.16.16.14, destination port: 53',
      'source IP: 207.16.14.7, destination port: 80',
      'source IP: 207.16.13.14, destination application: http',
    ]));
    expect(parsed?.answer).toHaveLength(5);
    expect(parsed?.answer.filter((choice) => choice === 0)).toHaveLength(3);
    expect(parsed?.answer.filter((choice) => choice === 1)).toHaveLength(2);
  });

  it('does not assign line style to explicitly numbered questions with equal item and choice counts', () => {
    const lineMatchIds = pickLineMatchIds([
      { id: 1, items: ['A', 'B'], choices: ['X', 'Y'], matchStyle: 'numbers' },
      { id: 2, items: ['C', 'D'], choices: ['Z', 'W'] },
      { id: 3, items: ['E', 'F'], choices: ['U', 'V'] },
    ]);

    expect(lineMatchIds).toEqual(new Set([3]));
  });
});
