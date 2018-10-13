import React from 'react';
import {Dialog, Form, Input, Select} from '@alifd/next';
import {I18N, DIALOG_FORM_LAYOUT} from './constant'

const FormItem = Form.Item;
const Option = Select.Option

/*****************************此行为标记行, 请勿删和修改此行, 文件和组件依赖请写在此行上面, 主体代码请写在此行下面的class中*****************************/
class EditServiceDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editService: {},
            editServiceDialogVisible: false
        }
        this.show = this.show.bind(this)
    }

    show(editService) {
        const {metadata = {}} = editService
        if (Object.keys(metadata).length) {
            editService.metadataText = Object.keys(metadata).map(k => `${k}=${metadata[k]}`).join(',')
        }
        this.setState({editService, editServiceDialogVisible: true})
    }

    hide() {
        this.setState({editServiceDialogVisible: false})
    }

    onConfirm() {
        const editService = Object.assign({}, this.state)
        console.log('confirm', editService)
        this.hide()
    }

    onChangeCluster(changeVal) {
        const {editService = {}} = this.state
        this.setState({
            editService: Object.assign({}, editService, changeVal)
        })
    }

    render() {
        const {editService, editServiceDialogVisible} = this.state
        const {
            name,
            protectThreshold,
            healthCheckMode,
            metadataText
        } = editService
        return (
            <Dialog
                className="service-detail-edit-dialog"
                title={I18N.UPDATE_SERVICE}
                visible={editServiceDialogVisible}
                onOk={() => this.onConfirm()}
                onCancel={() => this.hide()}
                onClose={() => this.hide()}
            >
                <Form {...DIALOG_FORM_LAYOUT}>
                    <FormItem label={`${I18N.SERVICE_NAME}:`}>
                        <p>{name}</p>
                    </FormItem>
                    <FormItem label={`${I18N.PROTECT_THRESHOLD}:`}>
                        <Input
                            className="in-text"
                            value={protectThreshold}
                            onChange={protectThreshold => this.onChangeCluster({protectThreshold})}
                        />
                    </FormItem>
                    <FormItem label={`${I18N.HEALTH_CHECK_PATTERN}:`}>
                        <Select
                            className="in-select"
                            defaultValue={healthCheckMode}
                            onChange={healthCheckMode => this.onChangeCluster({healthCheckMode})}
                        >
                            <Option value="server">{I18N.HEALTH_CHECK_PATTERN_SERVICE}</Option>
                            <Option value="client">{I18N.HEALTH_CHECK_PATTERN_CLIENT}</Option>
                            <Option value="forbidden">{I18N.HEALTH_CHECK_PATTERN_FORBIDDEN}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label={`${I18N.METADATA}:`}>
                        <Input
                            className="in-text"
                            value={metadataText}
                            onChange={metadataText => this.onChangeCluster({metadataText})}
                        />
                    </FormItem>
                </Form>
            </Dialog>
        )
    }
}

/*****************************此行为标记行, 请勿删和修改此行, 主体代码请写在此行上面的class中, 组件导出语句及其他信息请写在此行下面*****************************/
export default EditServiceDialog;
