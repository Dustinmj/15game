'use strict'

export const getCoordinates = ( { width, height, length } ) => {
  const coords = [];
  for ( let i in [...Array( length * length).keys()] ) {
    const xPos = i % length;
    const yPos = Math.floor( i / length );
    const x = width * xPos;
    const y = height * yPos;
    const label = parseInt( i ) + 1;
    coords.push( { label, x, y } );
  }
  coords[ coords.length - 1 ].label = -1
  return coords;
}

export const adjustCoordinates = ( coords, { width, height, length } ) => {
  for ( let i in coords ) {
    const xPos = i % length;
    const yPos = Math.floor( i / length );
    const x = width * xPos;
    const y = height * yPos;
    const label = parseInt( i ) + 1;
    coords[ i ].x = x;
    coords[ i ].y = y;
  }
  return coords;
}

const swapValues = ( context, coords, from, to ) => {
  const oldX = coords[ from ].x;
  const oldY = coords[ from ].y;
  coords[ from ].x = coords[ to ].x;
  coords[ from ].y = coords[ to ].y;
  coords[ to ].x = oldX;
  coords[ to ].y = oldY;
  const old = {
    x: coords[ from ].x,
    y: coords[ from ].y,
    label: coords[ from ].label
  };
  context.set( coords, from, coords[ to ] );
  context.set( coords, to, old );
  return coords;
}

export const calculateMove = ( context, coords, label, { length } ) => {

  const index = coords.findIndex( el => {
    return el.label === label;
  });

  const blank = coords.findIndex( el => {
    return el.label === -1;
  });

  if( index < 0 ) return coords;

  const top = index - length;
  const bottom = index + length;
  const left = index - 1;
  const right = index + 1;

  // console.log( index, blank, top, bottom, left, right )

  if( blank === top || blank === bottom ) {
    return swapValues( context, coords, index, blank );
  } else if( left % length !== 3 && blank === left ) {
    return swapValues( context, coords, index, blank );
  } else if( right % 4 !== 0 && blank === right ) {
    return swapValues( context, coords, index, blank );
  }

  return coords;

}

const getInversions = coords => {
  let inversions = 0;
  for( let c in coords ) {
    const coord = coords[ c ];
    if( coord.label !== -1 ) {
      for( let i = c; i < coords.length; i++ ) {
        if( coord.label > coords[ i ].label ) {
          ++inversions;
        }
      }
    }
  }
  return inversions;
}

export const checkPuzzleSolvable = ( coords, { length } ) => {
  const nIsOdd = length % 2 !== 0 && length !== 0;
  const inversions = getInversions( coords );
  if( inversions === 0 ) return true;
  const inversionsAreEven = inversions % 2 === 0 && inversions !== 0;
  if( nIsOdd ) {
    return inversionsAreEven;
  } else {
    const blank = coords.findIndex( el => {
      return el.label === -1;
    });
    // 1 indexed
    const blankRow = Math.floor( blank / length ) + 1;
    const lastRow = length;
    const rowDelta = lastRow - blankRow;
    const even = rowDelta !== 0 && rowDelta % 2 === 0;
    return ( even && !inversionsAreEven ) || ( !even && inversionsAreEven );
  }
}
