
def get_not_null_row(ws, row_index, min_col, max_col):
    """Get cells up to first blank in a row"""

    row = []
    for col in ws.iter_cols(min_col, max_col, values_only=True):
        if col[row_index] is None:
            break
        row.append(col[row_index])
    return row


def get_rows(ws, min_row, max_row, min_col, max_col):
    """Get 2d list with cells"""

    return [[col[i] for col in ws.iter_cols(min_col, max_col, values_only=True)]
            for i in range(min_row, max_row)]
