const catagories = {
    'output': {
        name: 'Output',
        toolbox_color: '#e6b815',
    },
    'jump': {
        name: 'Jump',
        toolbox_color: '#69d1a4',
    },
    'transform': {
        name: 'Transform',
        toolbox_color: '#07aced',
    },
    'math': {
        name: 'Math',
        toolbox_color: '#30db52',
    },
    'slot': {
        name: 'Slot',
        toolbox_color: '#645de8',
    },
}

const toolboxBlocks = {
    "print": {
        catagory: 'output',
        sectors: [
            {
                type: 'text',
                content: 'print'
            },
            {
                type: 'input',
                content: 'Hello, World!'
            },
        ]
    },
    "jump_if": {
        catagory: 'jump',
        sectors: [
            {
                type: 'text',
                content: 'jump to'
            },
            {
                type: 'input',
                content: 0,
            },
            {
                type: 'text',
                content: 'if'
            },
            {
                type: 'input',
                content: ''
            },
            {
                type: 'options',
                content: ['==', '!=', '<', '>', '<=', '>=']
            },
            {
                type: 'input',
                content: ''
            },
        ]
    },
    "jump_to": {
        catagory: 'jump',
        sectors: [
            {
                type: 'text',
                content: 'jump to'
            },
            {
                type: 'input',
                content: 0,
            },
        ]
    },
    "return": {
        catagory: 'jump',
        sectors: [
            {
                type: 'text',
                content: 'return'
            },
        ]
    },
    "set_slot": {
        catagory: 'slot',
        sectors: [
            {
                type: 'text',
                content: 'set'
            },
            {
                type: 'options',
                content: ['my slot', 'my slot 2']
            },
            {
                type: 'text',
                content: 'to'
            },
            {
                type: 'input',
                content: '0'
            },
        ]
    },
    "change_slot": {
        catagory: 'slot',
        sectors: [
            {
                type: 'text',
                content: 'change'
            },
            {
                type: 'options',
                content: ['my slot', 'my slot 2']
            },
            {
                type: 'text',
                content: 'by'
            },
            {
                type: 'input',
                content: '1'
            },
        ]
    },
    "set_transform": {
        catagory: 'transform',
        sectors: [
            {
                type: 'text',
                content: 'set'
            },
            {
                type: 'options',
                content: ['position', 'rotation', 'size']
            },
            {
                type: 'text',
                content: 'to'
            },
            {
                type: 'input',
                content: '0'
            },
            {
                type: 'input',
                content: '0'
            },
            {
                type: 'input',
                content: '0'
            },
        ]
    },
    "change_transform": {
        catagory: 'transform',
        sectors: [
            {
                type: 'text',
                content: 'change'
            },
            {
                type: 'options',
                content: ['position', 'rotation', 'size']
            },
            {
                type: 'text',
                content: 'by'
            },
            {
                type: 'input',
                content: '0'
            },
            {
                type: 'input',
                content: '0'
            },
            {
                type: 'input',
                content: '0'
            },
        ]
    },
    "if": {
        catagory: 'procedure',
        sectors: [
            {
                type: 'text',
                content: 'if'
            },
            {
                type: 'blocklist'
            },
        ]
    },
}

const toolboxSlots = {
    "add": {
        catagory: 'math',
        sectors: [
            {
                type: 'input',
                content: '0'
            },
            {
                type: 'text',
                content: '+'
            },
            {
                type: 'input',
                content: '0'
            },
        ]
    },
    "sub": {
        catagory: 'math',
        sectors: [
            {
                type: 'input',
                content: '0'
            },
            {
                type: 'text',
                content: '-'
            },
            {
                type: 'input',
                content: '0'
            },
        ]
    },
    "mul": {
        catagory: 'math',
        sectors: [
            {
                type: 'input',
                content: '0'
            },
            {
                type: 'text',
                content: '*'
            },
            {
                type: 'input',
                content: '0'
            },
        ]
    },
    "div": {
        catagory: 'math',
        sectors: [
            {
                type: 'input',
                content: '0'
            },
            {
                type: 'text',
                content: '/'
            },
            {
                type: 'input',
                content: '0'
            },
        ]
    },
    
    "sin": {
        catagory: 'math',
        sectors: [
            {
                type: 'options',
                content: [
                    'sin',
                    'cos',
                    'tan',
                    'abs',
                    
                ]
            },
            {
                type: 'input',
                content: '0'
            },
        ]
    },
    
    "clock": {
        catagory: 'math',
        sectors: [
            {
                type: 'text',
                content: 'clock'
            },
        ]
    },
    
    "position": {
        catagory: 'transform',
        sectors: [
            {
                type: 'text',
                content: 'position'
            },
            {
                type: 'options',
                content: ['x', 'y', 'z']
            },
        ]
    },
    "rotation": {
        catagory: 'transform',
        sectors: [
            {
                type: 'text',
                content: 'rotation'
            },
            {
                type: 'options',
                content: ['x', 'y', 'z']
            },
        ]
    },
    "size": {
        catagory: 'transform',
        sectors: [
            {
                type: 'text',
                content: 'size'
            },
            {
                type: 'options',
                content: ['x', 'y', 'z']
            },
        ]
    },
}
