schema.dxDataGrid = {
    "$schema": "http://json-schema.org/draft-04/schema#",
    "definitions": {
        "editorType": {
            "type": "string",
            "enum": [
                "dxTextBox",
                "dxDateBox",
                "dxSelectBox",
                "dxTextArea",
                "dxCalendar"
            ]
        },
        "formItem": {
            "type": "object",
            "properties": {
                "colSpan ": {
                    "type": "number"
                },
                "editorType": {
                    "$ref": "#/definitions/editorType"
                },
                "editorOptions": {
                    "$ref": "#/definitions/editorOptions"
                }
            }
        },
        "editorOptions": {
            "type": "object",
            "properties": {
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
                },
                "displayExpr": {
                    "type": "string"
                },
                "valueExpr": {
                    "type": "string"
                }
            }
        },
        "lookup": {
            "type": "object",
            "properties": {
                "dataSource": {
                    "type": "string"
                },
                "valueExpr": {
                    "type": "string"
                },
                "displayExpr": {
                    "type": "string"
                }
            }
        },
        "column": {
            "type": "object",
            "properties": {
                "dataField": {
                    "type": "string"
                },
                "caption": {
                    "type": "string"
                },
                "width": {
                    "type": "string"
                },
                "alignment": {
                    "type": "string",
                    "default": "row",
                    "enum": [
                        "right",
                        "center",
                        "left"
                    ]
                },
                "dataType": {
                    "type": "string",
                    "default": "string",
                    "enum": [
                        "number",
                        "boolean",
                        "string",
                        "date",
                        "datetime"
                    ]
                },
                "visible": {
                    "type": "boolean",
                    "default": true
                },
                "allowEditing": {
                    "type": "boolean",
                    "default": true
                },
                "allowSearch": {
                    "type": "boolean",
                    "default": true
                },
                "allowSorting": {
                    "type": "boolean",
                    "default": true
                },
                "formItem": {
                    "$ref": "#/definitions/formItem"
                }
            }
        },
        "editing": {
            "type": "object",
            "properties": {
                "mode": {
                    "type": "string",
                    "default": "row",
                    "enum": [
                        "batch",
                        "cell",
                        "row",
                        "form",
                        "popup"
                    ]
                },
                "allowAdding": {
                    "type": "boolean",
                    "default": false
                },
                "allowDeleting": {
                    "type": "boolean",
                    "default": false
                },
                "allowUpdating": {
                    "type": "boolean",
                    "default": false
                },
                "form": {
                    "type": "string",
                    "default": ""
                },

                "popup": {
                    "type": "string"
                },
                "refreshMode": {
                    "type": "string"
                },
                "selectTextOnEditStart": {
                    "type": "boolean"
                }
            }
        }
    },
    "type": "object",
    "properties": {
        "keyExpr": {
            "type": "string"
        },
        "editing": {
            "$ref": "#/definitions/editing"
        },
        "columns": {
            "type": "array",
            "uniqueItems": true,
            "items": {
                "$ref": "#/definitions/column"
            }
        },
        "columnAutoWidth": {
            "type": "boolean",
            "default": false
        },
        "remoteOperations": {
            "type": "object",
            "properties": {
                "filtering": {
                    "type": "boolean",
                    "default": false
                },
                "grouping":  {
                    "type": "boolean",
                    "default": false
                },
                "groupPaging":  {
                    "type": "boolean",
                    "default": false
                },
                "paging":  {
                    "type": "boolean",
                    "default": false
                },
                "sorting":  {
                    "type": "boolean",
                    "default": false
                },
                "summary": {
                    "type": "boolean",
                    "default": false
                }
            }
        }
    }
};
