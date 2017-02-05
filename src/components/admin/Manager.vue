<template>
<div>  
  <section class="content">
    <div class="row center-block">
      <!--
      <h2>名單列表</h2>
      -->
      <div class="col-md-12">
        <div class="box">
          <div class="box-header">
              <!--
            <h3 class="box-title">List</h3>
              -->
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <div class="dataTables_wrapper form-inline dt-bootstrap" id="example1_wrapper">
              <div class="row">
                <div class="col-sm-6">
                  <div id="example1_length" class="dataTables_length"></div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12">
                  <table id="managerData" class="table table-bordered table-striped">
                    <caption>
                      <button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal" @click="add()">管理者</button>
                    </caption>
                    <thead>
                      <tr role="row">
                        <th>編號</th>
                        <th>姓名</th>
                        <th>信箱</th>
                        <th>地址</th>
                        <th>手機</th>
                        <th>狀態</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="even" role="row" v-for="(row, index) in rowData" >
                        <td>{{row.id}}</td>
                        <td>{{row.name}}</td>
                        <td>{{row.email}}</td>
                        <td>{{row.address}}</td>
                        <td>{{row.phone}}</td>
                        <td>
                          <span class="fa fa-check-square-o" v-if="row.status==1"></span>
                          <span class="fa fa-close" v-else> 停用中</span>
                        </td>
                        <td>
                            <button type="button" data-toggle="modal" data-target="#myModal" class="btn btn-sm btn-success" @click="edit(row,index)">編輯</button>
                        </td>
                        <td>
                            <button type="button" class="btn btn-sm btn-default" @click="del(row)">刪除</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                </div>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </div>
  </section>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">管理者資料</h4>
      </div>
      <div class="modal-body">

<form class="form-horizontal">
  <div class="form-group">
    <label for="name" class="col-sm-2 control-label">姓名</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" id="name" placeholder="姓名" v-model="name">
    </div>
  </div>
  <div class="form-group">
    <label for="account" class="col-sm-2 control-label">帳號</label>
    <div class="col-sm-10">
      <input type="email" class="form-control" id="account" placeholder="帳號" v-model="email">
    </div>
  </div>
  <div class="form-group">
    <label for="password" class="col-sm-2 control-label">密碼</label>
    <div class="col-sm-10">
      <input type="password" class="form-control" id="password" placeholder="密碼" v-model="password">
    </div>
  </div>
  <div class="form-group">
    <label for="password" class="col-sm-2 control-label">地址</label>
    <div class="col-sm-10">
      <input type="text" class="form-control" placeholder="地址" v-model="address">
    </div>
  </div>
  <div class="form-group">
    <label for="password" class="col-sm-2 control-label">狀態</label>
    <div class="col-sm-10">
        <select v-model="status">
          <option v-for="option in options" v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>
    </div>
  </div>
</form>

      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="saveManager()">儲存</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">關閉</button>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
import $ from 'jquery'
require('datatables.net')
require('datatables.net-bs')

const SetDataTable = (eleType, destroy) => {
  $(eleType).dataTable({
    destroy: destroy || true,
    language: {
      url: './static/config/dataTable.json'
    }
  })
}

export default {
  name: 'managers',
  data () {
    return {
      rowData: [],
      apiurl: this.$store.state.apiurl,
      email: '',
      name: '',
      id: '',
      password: '',
      address: '',
      token: this.$store.state.token,
      opstate: '',
      status: 1,
      options: [
        { text: '啟用', value: 1 },
        { text: '關閉', value: 0 }
      ]
    }
  },
  mounted: function () {
    this.loadData()
  },
  methods: {
    loadData: function () {
      this.$http.get(this.apiurl + '/managers', {params: {token: this.token}}).then(function (res) {
        // console.log(res.body.data)
        this.rowData = res.body.data
        this.$nextTick(function () {
          SetDataTable('#managerData')
        })
      }, {
        // headers: {'X-CSRF-TOKEN': this.token}
      }, function () {
        console.log('failed')
      })
    },
    saveManager: function () {
      let message = ''
      if (this.email === '') {
        message += '請填寫信箱\n'
      } else if (this.name === '') {
        message += '請填寫姓名\n'
      }

      if (message === '') {
        let data = {
          email: this.email,
          name: this.name,
          address: this.address,
          password: this.password,
          status: this.status,
          token: this.token
        }
        if (this.id === '') {
          // 建立管理者
          this.$http.post(this.apiurl + '/managers', data).then(function (res) {
            console.log(res.body.data)
          }, function () {
            console.log('failed')
          })
        } else {
          // 編輯資料
          this.$http.put(this.apiurl + '/managers/' + this.id, data).then(function (res) {
            console.log(res.body.data)
            if (res.body.data.id !== '') {
              window.alert('編輯成功')
              window.location.reload()
            }
          }, function () {
            console.log('failed')
          })
        }
      } else {
        window.alert(message)
      }
      // this.$router.push('/managerNew')
    },
    edit: function (data, index) {
      this.opstate = 'edit'
      this.email = data.email
      this.password = data.password
      this.name = data.name
      this.address = data.address
      this.status = data.status
      this.id = data.id
    },
    add: function () {
      this.opstate = 'add'
      // console.log('state' + this.opstate)
      this.email = ''
      this.password = ''
      this.name = ''
      this.id = ''
    },
    del: function (data) {
      if (window.confirm('確定要刪除【' + data.name + '】管理者嗎?')) {
        this.$http.delete(this.apiurl + '/managers/' + data.id).then(function (res) {
          console.log(res.body.data)
        }, function () {
          console.log('failed')
        })
      } else {
        return false
      }
    }
  }
}
</script>

<style>
@import url('/static/js/plugins/datatables/dataTables.bootstrap.css')

table.dataTable thead .sorting:after, table.dataTable thead .sorting_asc:after, table.dataTable thead .sorting_desc:after {
  font-family: 'FontAwesome'
}

table.dataTable thead .sorting:after {
  content: "\f0dc"
}

table.dataTable thead .sorting_asc:after {
  content: "\f0dd"
}

table.dataTable thead .sorting_desc:after {
  content: "\f0de"
}
</style>
