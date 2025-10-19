import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { getElementProperty } from '../utils';
import '../styles/SelectButton.css';

function SelectButton(props) {
    const optionSelectorWidth = 26;
    const optionSelectorHeight = 6;

    const selectButtonRef = useRef(null);
    const optionSelectorRef = useRef(null);
    const selectedOptionIndexRef = useRef(props.selectedOptionIndex || 0);
    const currentlySelectedOptionRef = useRef(null);
    const resizeObserverRef = useRef(null);

    const calculatePositionAndSizeOfOptionSelector = (label) => {
        if (!label || !optionSelectorRef.current) return;

        const parentLeftPadding = getElementProperty(label.offsetParent, "padding-left", true);
        const bonus = optionSelectorWidth;

        const thumb = optionSelectorRef.current;
        thumb.style.width = `${label.offsetWidth + bonus}px`;
        thumb.style.height = `${label.offsetHeight + optionSelectorHeight}px`;

        const x = label.offsetLeft - parentLeftPadding - bonus / 2;
        thumb.style.transform = `translate(${x}px, 0px)`;
    };

    const handleLabelClick = (event) => {
        const label = event.target;
        currentlySelectedOptionRef.current = label;

        const labelsArray = Array.from(selectButtonRef.current.querySelectorAll("label"));
        selectedOptionIndexRef.current = labelsArray.indexOf(label);

        props.callback(selectedOptionIndexRef.current);
        calculatePositionAndSizeOfOptionSelector(label);
    };

    const renderLabels = React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                onClick: handleLabelClick
            });
        }
        return child;
    });

    const getLabelFromNumber = (index) => {
        const labels = selectButtonRef.current.querySelectorAll("label");
        return labels[index] || null;
    };

    // Update the currently selected option (visually) when the selectedOptionIndex prop changes (aka, when the currently selected option changes programatically from outside instead of changing from a user click)
    useEffect(() => {
        const selectedLabel = getLabelFromNumber(props.selectedOptionIndex);
        currentlySelectedOptionRef.current = selectedLabel;
        calculatePositionAndSizeOfOptionSelector(selectedLabel);
    }, [props.selectedOptionIndex]);

    // set initial thumb position after DOM is fully laid out
    useLayoutEffect(() => {
        const selectedLabel = getLabelFromNumber(selectedOptionIndexRef.current);
        currentlySelectedOptionRef.current = selectedLabel;
        selectButtonRef.current.style.margin = props.margin;

        requestAnimationFrame(() => {
            calculatePositionAndSizeOfOptionSelector(selectedLabel);
        });

        if ('ResizeObserver' in window) {
            resizeObserverRef.current = new ResizeObserver(() => {
                calculatePositionAndSizeOfOptionSelector(currentlySelectedOptionRef.current);
            });
            resizeObserverRef.current.observe(selectButtonRef.current);
        }

        return () => {
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }
        };
    }, []);

    return (
        <div ref={selectButtonRef} className='select-button-container'>
            {renderLabels}
            <div ref={optionSelectorRef} className='option-selector' />
        </div>
    );
}

export default SelectButton;