function ListBoostrapComponent(param) {
    if(param != null) {
        return (
            <div className="table">
                {param.button}
                <h2 className="text-center">{param.title}</h2>
                {param.actionAdd}
                <table className="table table-bordered border-primary">
                    <thead>
                        <tr>
                            {param.columns.map(column => {
                                return (
                                    <th>{column}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {param.rows.map(row => {
                            return row
                        })}
                    </tbody>
                </table>
            </div>
        )
    } else {
        return ''
    }
}
export default ListBoostrapComponent;