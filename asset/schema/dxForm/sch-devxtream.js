schema.dxForm = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "definitions": {
        "formitems": {
            "type": "object",
            "properties": {
                "dataField": {
                    "type": "string"
                },
                "itemType": {
                    "$ref": "#/definitions/itemType"
                },
                "editorType": {
                    "$ref": "#/definitions/editorType"
                },
                "helpText": {
                    "type": "string"
                },
                "label": {
                    "$ref": "#/definitions/label"
                },
                "colSpan ": {
                    "type": "number"
                },
                "colCount": {
                    "type": "number"
                },
                "items": {
                    "type": "array",
                    "uniqueItems": true,
                    "items": {
                        "$ref": "#/definitions/formitems_level1"
                    }
                },
                "tabs": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/tabitem"
                    }

                },
                "editorOptions": {
                    "$ref": "#/definitions/editorOptions"
                },
                "caption": {
                    "type": "string"
                }
            }
        },
        "formitems_level1": {
            "type": "object",
            "properties": {
                "dataField": {
                    "type": "string"
                },
                "itemType": {
                    "$ref": "#/definitions/itemType"
                },
                "editorType": {
                    "$ref": "#/definitions/editorType"
                },
                "helpText": {
                    "type": "string"
                },
                "label": {
                    "$ref": "#/definitions/label"
                },
                "colSpan ": {
                    "type": "number"
                },
                "colCount": {
                    "type": "number"
                },
                "items": {
                    "type": "array",
                    "uniqueItems": true,
                    "items": {
                        "$ref": "#/definitions/formitems_level2"
                    }
                },
                "editorOptions": {
                    "$ref": "#/definitions/editorOptions"
                }
            }
        },
        "formitems_level2": {
            "type": "object",
            "properties": {
                "itemType": {
                    "$ref": "#/definitions/itemType"
                },
                "dataField": {
                    "type": "string"
                },
                "editorType": {
                    "$ref": "#/definitions/editorType"
                },
                "helpText": {
                    "type": "string"
                },
                "label": {
                    "$ref": "#/definitions/label"
                },
                "colSpan ": {
                    "type": "number"
                },
                "editorOptions": {
                    "$ref": "#/definitions/editorOptions"
                }
            }
        },
        "tabitem" :{
            "type": "object",
            "properties": {
                "title": {
                    "type": "string"
                },
                "items": {
                    "type": "array",
                    "uniqueItems": true,
                    "items": {
                        "$ref": "#/definitions/formitems_level1"
                    }
                }
            }
        },
        "editorType": {
            "type": "string",
            "enum": [
                "dxTextBox",
                "dxDateBox",
                "dxCheckBox",
                "dxTextArea",
                "dxCalendar",
                "dxColorBox",
                "dxDropDownBox",
                "dxHtmlEditor",
                "dxLookup",
                "dxNumberBox",
                "dxRadioGroup",
                "dxRangeSlider",
                "dxSlider",
                "dxSelectBox",
                "dxSwitch",
                "dxTagBox",
                "dxAutocomplete"
            ]
        },
        "label": {
            "type": "object",
            "properties": {
                "text": {
                    "type": "string"
                },
                "location": {
                    "type": "string",
                    "enum": [
                        "right",
                        "left"
                    ]
                },
                "alignment": {
                    "type": "string",
                    "enum": [
                        "right",
                        "center",
                        "left"
                    ]
                }
            },
            "itemType": {
                "type": "string",
                "enum": [
                    "group"
                ]
            },
            "isRequired": {
                "type": "boolean"
            },
            "validationRules": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string",
                            "enum": [
                                "required"
                            ]
                        },
                        "message": {
                            "type": "string"
                        }
                    }
                }
            },
            "labelLocation": {
                "type": "string",
                "enum": [
                    "left",
                    "right",
                    "top"
                ]
            },
            "rtlEnabled": {
                "type": "boolean"
            }
        },
        "editorOptions": {
            "type": "object",
            "properties": {
                "items": {
                    "type": "array",
                    "items": {}
                },
                "searchEnabled": {
                    "type": "boolean"
                },
                "value": {
                    "type": "string"
                },
                "width": {
                    "type": "string"
                },
                "height": {
                    "type": "string"
                },
                "disabled": {
                    "type": "boolean"
                },
                "mask": {
                    "type": "string"
                },
                "maskRules": {
                    "type": "string"
                }
            }
        },
        "itemType": {
            "type": "string",
            "enum": [
                "",
                "group",
                "tabbed"
            ]
        }
    },
    "type": "object",
    "properties": {
        "colCount": {
            "type": "integer"
        },
        "formData": {
            "type": "array",
            "items": {
                "type": "string"
            }
        },
        "items": {
            "type": "array",
            "uniqueItems": true,
            "items": {
                "$ref": "#/definitions/formitems"
            }
        },
        "scrollingEnabled": {
            "type": "boolean"
        },
        "showColonAfterLabel": {
            "type": "boolean"
        },
        "width": {
            "type": "string"
        }
    },
    "required": [
        "items"
    ]
}
