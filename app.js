// Set Calculator - Web UI JavaScript

(function() {
    'use strict';

    // Set Calculator script loading...

    // Parse input based on separator type
    function parseSet(input, separator, trimWhitespace) {
        if (!input || !input.trim()) {
            return [];
        }

        // Trim the entire input first
        input = input.trim();
        
        let elements = [];
        
        if (separator === 'comma') {
            // Split by comma first
            elements = input.split(',');
        } else {
            // For newline separator, split by newline first
            const lines = input.split(/\r?\n/);
            // Then split each line by comma (handles mixed formats like "2, 6" on one line)
            for (let line of lines) {
                line = line.trim(); // Trim each line
                if (!line) continue; // Skip empty lines
                
                if (line.includes(',')) {
                    // Line has commas, split it
                    const lineElements = line.split(',');
                    for (let el of lineElements) {
                        elements.push(el);
                    }
                } else {
                    // Line has no commas, treat as single element
                    elements.push(line);
                }
            }
        }

        let result = [];
        for (let el of elements) {
            let elStripped = trimWhitespace ? el.trim() : el;
            
            // Skip empty elements
            if (!elStripped || elStripped === '') continue;
            
            // Remove trailing comma (in case user mixed formats)
            if (elStripped.endsWith(',')) {
                elStripped = trimWhitespace ? elStripped.slice(0, -1).trim() : elStripped.slice(0, -1);
            }
            
            // Skip if empty after processing
            if (!elStripped || elStripped === '') continue;
            
            result.push(elStripped);
        }

        return result;
    }

    // Remove duplicates while preserving order
    function removeDuplicates(arr) {
        const seen = new Set();
        const result = [];
        for (const el of arr) {
            if (!seen.has(el)) {
                seen.add(el);
                result.push(el);
            }
        }
        return result;
    }

    // Auto-detect input format
    function detectSeparator(input) {
        if (!input || !input.trim()) {
            return 'comma'; // default
        }

        // Count commas and newlines
        const commaCount = (input.match(/,/g) || []).length;
        const newlineCount = (input.match(/\r?\n/g) || []).length;
        
        // If more newlines than commas, treat as newline-separated
        if (newlineCount > commaCount) {
            return 'newline';
        }
        // If has commas (even with some newlines), treat as comma-separated
        if (commaCount > 0) {
            return 'comma';
        }
        // If has newlines but no commas, treat as newline-separated
        if (newlineCount > 0) {
            return 'newline';
        }
        // Default to comma
        return 'comma';
    }

    // Get sets from inputs (always auto-detect format)
    function getSets() {
        try {
            const trimWhitespace = document.getElementById('trimWhitespace')?.checked ?? true;
            const removeDups = document.getElementById('removeDuplicates')?.checked ?? true;

            const setAElement = document.getElementById('setA');
            const setBElement = document.getElementById('setB');
            
            let setAInput = (setAElement && setAElement.value) ? setAElement.value : '';
            let setBInput = (setBElement && setBElement.value) ? setBElement.value : '';

            // Auto-detect separator for each set independently
            const separatorA = detectSeparator(setAInput);
            const separatorB = detectSeparator(setBInput);

            let setA = parseSet(setAInput, separatorA, trimWhitespace);
            let setB = parseSet(setBInput, separatorB, trimWhitespace);

            if (removeDups) {
                setA = removeDuplicates(setA);
                setB = removeDuplicates(setB);
            }

            return { setA, setB };
        } catch (error) {
            console.error('Error in getSets:', error);
            return { setA: [], setB: [] };
        }
    }

    // Set operations
    function union(setA, setB) {
        return removeDuplicates([...setA, ...setB]);
    }

    function intersection(setA, setB) {
        const setBSet = new Set(setB);
        return setA.filter(x => setBSet.has(x));
    }

    function difference(setA, setB) {
        const setBSet = new Set(setB);
        return setA.filter(x => !setBSet.has(x));
    }

    function symmetricDifference(setA, setB) {
        const diffAB = difference(setA, setB);
        const diffBA = difference(setB, setA);
        return union(diffAB, diffBA);
    }

    // Escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = String(text);
        return div.innerHTML;
    }

    // Update set previews
    function updatePreviews() {
        try {
            const { setA, setB } = getSets();
            
            // Update Set A preview
            const setAPreview = document.getElementById('setAPreviewContent');
            const setACount = document.getElementById('setACount');
            
            if (setAPreview) {
                if (!setA || !Array.isArray(setA) || setA.length === 0) {
                    setAPreview.textContent = 'Empty set';
                    setAPreview.className = 'preview-content empty-set';
                } else {
                    setAPreview.textContent = '{ ' + setA.map(escapeHtml).join(', ') + ' }';
                    setAPreview.className = 'preview-content';
                }
            }
            if (setACount) {
                const count = (setA && Array.isArray(setA) && setA.length > 0) ? setA.length : 0;
                setACount.textContent = count + ' element' + (count !== 1 ? 's' : '');
            }

            // Update Set B preview
            const setBPreview = document.getElementById('setBPreviewContent');
            const setBCount = document.getElementById('setBCount');
            if (setBPreview) {
                if (!setB || !Array.isArray(setB) || setB.length === 0) {
                    setBPreview.textContent = 'Empty set';
                    setBPreview.className = 'preview-content empty-set';
                } else {
                    setBPreview.textContent = '{ ' + setB.map(escapeHtml).join(', ') + ' }';
                    setBPreview.className = 'preview-content';
                }
            }
            if (setBCount) {
                const count = (setB && Array.isArray(setB) && setB.length > 0) ? setB.length : 0;
                setBCount.textContent = count + ' element' + (count !== 1 ? 's' : '');
            }

            // Update set displays
            const setADisplay = document.getElementById('setADisplay');
            const setBDisplay = document.getElementById('setBDisplay');
            
            if (setADisplay) {
                if (!setA || setA.length === 0) {
                    setADisplay.textContent = 'Not entered';
                    setADisplay.className = 'set-display-content empty-set';
                } else {
                    setADisplay.textContent = '{ ' + setA.map(escapeHtml).join(', ') + ' }';
                    setADisplay.className = 'set-display-content';
                }
            }

            if (setBDisplay) {
                if (!setB || setB.length === 0) {
                    setBDisplay.textContent = 'Not entered';
                    setBDisplay.className = 'set-display-content empty-set';
                } else {
                    setBDisplay.textContent = '{ ' + setB.map(escapeHtml).join(', ') + ' }';
                    setBDisplay.className = 'set-display-content';
                }
            }
        } catch (error) {
            console.error('Error in updatePreviews:', error);
        }
    }

    // Display result
    function displayResult(result, operationName, symbol) {
        try {
            const resultDiv = document.getElementById('result');
            const countDiv = document.getElementById('resultCount');

            if (!resultDiv || !countDiv) {
                console.error('Result elements not found');
                return;
            }

            if (!result || result.length === 0) {
                resultDiv.innerHTML = '<p class="placeholder">∅ Empty set</p>';
                countDiv.textContent = '0 elements';
                
                // Hide copy button when no result
                const copyBtn = document.getElementById('copyResultBtn');
                if (copyBtn) {
                    copyBtn.style.display = 'none';
                }
            } else {
                // Get output format preference
                const outputFormatEl = document.querySelector('input[name="outputFormat"]:checked');
                const outputFormat = outputFormatEl ? outputFormatEl.value : 'comma';
                
                // Simple text display - no fancy styling
                let resultText;
                if (outputFormat === 'newline') {
                    resultText = result.map(escapeHtml).join('\n');
                } else {
                    resultText = result.map(escapeHtml).join(', ');
                }
                
                resultDiv.innerHTML = '<pre class="result-text">' + resultText + '</pre>';
                countDiv.textContent = result.length + ' element' + (result.length !== 1 ? 's' : '');
                
                // Show copy button
                const copyBtn = document.getElementById('copyResultBtn');
                if (copyBtn) {
                    copyBtn.style.display = 'flex';
                    // Store result data for copying
                    copyBtn.dataset.result = JSON.stringify(result);
                    copyBtn.dataset.format = outputFormat;
                }
            }

            // Scroll to result
            resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } catch (error) {
            console.error('Error in displayResult:', error);
        }
    }

    // Initialize function
    function init() {
        try {
            // Operation buttons
            const unionBtn = document.getElementById('unionBtn');
            const intersectionBtn = document.getElementById('intersectionBtn');
            const differenceABBtn = document.getElementById('differenceABBtn');
            const differenceBABtn = document.getElementById('differenceBABtn');
            const symmetricDiffBtn = document.getElementById('symmetricDiffBtn');

            if (!unionBtn || !intersectionBtn || !differenceABBtn || !differenceBABtn || !symmetricDiffBtn) {
                console.error('Operation buttons not found');
                return;
            }

            unionBtn.onclick = function() {
                const { setA, setB } = getSets();
                displayResult(union(setA, setB), 'Union', '∪');
            };

            intersectionBtn.onclick = function() {
                const { setA, setB } = getSets();
                displayResult(intersection(setA, setB), 'Intersection', '∩');
            };

            differenceABBtn.onclick = function() {
                const { setA, setB } = getSets();
                displayResult(difference(setA, setB), 'Difference', 'A − B');
            };

            differenceBABtn.onclick = function() {
                const { setA, setB } = getSets();
                displayResult(difference(setB, setA), 'Difference', 'B − A');
            };

            symmetricDiffBtn.onclick = function() {
                const { setA, setB } = getSets();
                displayResult(symmetricDifference(setA, setB), 'Symmetric Difference', '△');
            };

            // Input change listeners
            const setAInput = document.getElementById('setA');
            const setBInput = document.getElementById('setB');
            const trimCheck = document.getElementById('trimWhitespace');
            const dupCheck = document.getElementById('removeDuplicates');

            if (setAInput) {
                setAInput.addEventListener('input', updatePreviews);
                setAInput.addEventListener('paste', function() {
                    setTimeout(updatePreviews, 10);
                });
            }
            
            if (setBInput) {
                setBInput.addEventListener('input', updatePreviews);
                setBInput.addEventListener('paste', function() {
                    setTimeout(updatePreviews, 10);
                });
            }
            
            if (trimCheck) trimCheck.addEventListener('change', updatePreviews);
            if (dupCheck) dupCheck.addEventListener('change', updatePreviews);
            
            // Output format change listener (re-display result if exists)
            document.querySelectorAll('input[name="outputFormat"]').forEach(radio => {
                radio.addEventListener('change', function() {
                    // If there's a result displayed, re-display it with new format
                    const resultDiv = document.getElementById('result');
                    const copyBtn = document.getElementById('copyResultBtn');
                    if (resultDiv && copyBtn && copyBtn.dataset.result) {
                        // Use stored result data
                        try {
                            const resultItems = JSON.parse(copyBtn.dataset.result);
                            if (resultItems.length > 0) {
                                displayResult(resultItems, '', '');
                            }
                        } catch (e) {
                            // Fallback: extract from displayed items
                            const resultItems = Array.from(resultDiv.querySelectorAll('.result-item'))
                                .map(item => item.textContent);
                            if (resultItems.length > 0) {
                                displayResult(resultItems, '', '');
                            }
                        }
                    }
                });
            });

            // Copy button functionality
            const copyBtn = document.getElementById('copyResultBtn');
            if (copyBtn) {
                copyBtn.addEventListener('click', function() {
                    try {
                        const resultData = this.dataset.result;
                        const format = this.dataset.format || 'comma';
                        
                        if (!resultData) {
                            console.error('No result data to copy');
                            return;
                        }
                        
                        const result = JSON.parse(resultData);
                        let textToCopy;
                        
                        if (format === 'newline') {
                            textToCopy = result.join('\n');
                        } else {
                            textToCopy = result.join(', ');
                        }
                        
                        // Copy to clipboard
                        navigator.clipboard.writeText(textToCopy).then(() => {
                            // Visual feedback
                            const originalText = this.querySelector('.copy-text').textContent;
                            this.querySelector('.copy-text').textContent = 'Copied!';
                            this.classList.add('copied');
                            
                            setTimeout(() => {
                                this.querySelector('.copy-text').textContent = originalText;
                                this.classList.remove('copied');
                            }, 2000);
                        }).catch(err => {
                            console.error('Failed to copy:', err);
                            // Fallback for older browsers
                            const textArea = document.createElement('textarea');
                            textArea.value = textToCopy;
                            textArea.style.position = 'fixed';
                            textArea.style.opacity = '0';
                            document.body.appendChild(textArea);
                            textArea.select();
                            try {
                                document.execCommand('copy');
                                const originalText = this.querySelector('.copy-text').textContent;
                                this.querySelector('.copy-text').textContent = 'Copied!';
                                this.classList.add('copied');
                                setTimeout(() => {
                                    this.querySelector('.copy-text').textContent = originalText;
                                    this.classList.remove('copied');
                                }, 2000);
                            } catch (e) {
                                console.error('Fallback copy failed:', e);
                                alert('Failed to copy. Please select and copy manually.');
                            }
                            document.body.removeChild(textArea);
                        });
                    } catch (error) {
                        console.error('Error copying result:', error);
                    }
                });
            }

            // Example buttons
            const examples = {
                numbers: {
                    setA: '1, 2, 3, 4, 5',
                    setB: '4, 5, 6, 7, 8'
                },
                letters: {
                    setA: 'a, b, c, d, e',
                    setB: 'd, e, f, g, h'
                },
                words: {
                    setA: 'apple, banana, cherry, date',
                    setB: 'cherry, date, elderberry, fig'
                },
                clear: {
                    setA: '',
                    setB: ''
                }
            };

            document.querySelectorAll('.example-btn').forEach(btn => {
                btn.onclick = function() {
                    const example = examples[this.dataset.example];
                    if (example) {
                        if (setAInput) setAInput.value = example.setA;
                        if (setBInput) setBInput.value = example.setB;
                        updatePreviews();
                        
                        // Clear result
                        const resultDiv = document.getElementById('result');
                        const countDiv = document.getElementById('resultCount');
                        const copyBtn = document.getElementById('copyResultBtn');
                        if (resultDiv) {
                            resultDiv.innerHTML = '<p class="placeholder">Select an operation to see results</p>';
                        }
                        if (countDiv) {
                            countDiv.textContent = '0 elements';
                        }
                        if (copyBtn) {
                            copyBtn.style.display = 'none';
                            delete copyBtn.dataset.result;
                            delete copyBtn.dataset.format;
                        }
                    }
                };
            });

            // Initial update
            updatePreviews();
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    }

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM is already loaded
        init();
    }
})();
