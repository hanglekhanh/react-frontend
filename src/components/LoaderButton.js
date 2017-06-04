import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export default ({ isLoading, text, loadingText, disabled = false, ...props }) => (
    <Button disabled= { disabled || isLoading } {...props}>
        { isLoading && <Glyphicon glyph="refesh" className="spinning" /> }
        { ! isLoading ? text : loadingText }
    </Button>
);