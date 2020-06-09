import React, { useState } from 'react';
import * as Style from './Guitar.styles';
import Cell from './Cell';
import { Container, Label } from './Cell.styles';
import UniqueSelector from '../UniqueSelector';
import NumberSelector from '../NumberSelector';
import {
    NotesStrings,
    notesArray,
    isAtScale,
    strings,
    getNote
} from '../../core/notes';
import range from '../../core/utils/range';

export default function Guitar() {
    const [scale, setScale] = useState<NotesStrings>('C');
    const [fretNumber, setFretNumber] = useState(11);
    const [stringNumber, setStringNumber] = useState(6);
    const [instrument, setInstrument] = useState('Guitar');
    const [scaleKind, setScaleKind] = useState('diatonic');

    const generateStringNotes = (stringNote: number) =>
        range(fretNumber + 1).map(i => getNote((stringNote + i) % 12));
    return (
        <>
            <label>Instrument</label>
            <select
                id='cars'
                name='instrument'
                value={instrument}
                onChange={e => {
                    switch (e.target.value) {
                        case 'Guitar':
                            setStringNumber(6);
                            break;
                        case 'Bass':
                            setStringNumber(4);
                    }
                    setInstrument(e.target.value);
                }}
            >
                <option value='Guitar'>Guitar</option>
                <option value='Bass'>Bass</option>
            </select>
            <UniqueSelector
                options={[
                    'diatonic',
                    'harmonic',
                    'doubleHarmonic',
                    'pentatonic'
                ]}
                selected={scaleKind}
                onChange={setScaleKind}
                title={'Scale'}
            />
            <UniqueSelector
                options={['Standard', 'Drop D', 'Drop C', 'DADGAD']}
                selected={'Standard'}
                onChange={() => {}}
                title={'Tuning'}
            />
            <NumberSelector
                min={instrument === 'Guitar' ? 6 : 4}
                max={instrument === 'Guitar' ? 8 : 6}
                value={stringNumber}
                onChange={setStringNumber}
                title={'Strings'}
            />
            <NumberSelector
                min={11}
                max={24}
                value={fretNumber}
                onChange={setFretNumber}
                title={'Frets'}
            />
            <UniqueSelector
                options={notesArray}
                selected={scale}
                onChange={setScale}
                title={'key'}
            />
            <Style.Table>
                <tbody>
                    {strings[instrument][stringNumber].map((string, index) => (
                        <tr key={index}>
                            {generateStringNotes(string).map((note: any, i) => (
                                <Cell
                                    key={i}
                                    text={note}
                                    size={fretNumber}
                                    active={isAtScale(note, scale, scaleKind)}
                                />
                            ))}
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        {range(fretNumber + 1).map(i => (
                            <Container key={i} size={fretNumber}>
                                <Label>
                                    <b>{i}</b>
                                </Label>
                            </Container>
                        ))}
                    </tr>
                </tfoot>
            </Style.Table>
        </>
    );
}
