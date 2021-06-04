<template>
  <md-toolbar md-elevation="0" class="md-transparent">
    <div class="md-toolbar-row">
      <div class="md-toolbar-section-start">
        <!-- <h3 class="md-title">{{ $route.name }}</h3> -->
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: $sidebar.showSidebar }"
          @click="toggleSidebar"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="md-autocomplete">
            <!-- <md-autocomplete
              class="search"
              v-model="selectedEmployee"
              :md-options="employees"
            >
              <label>Search...</label>
            </md-autocomplete> -->
          </div>
          <md-list>
            <!-- <md-list-item href="#/notifications" class="dropdown">
              <drop-down>
                <a slot="title" class="dropdown-toggle" data-toggle="dropdown">
                  <i class="material-icons">notifications</i>
                  <span class="notification">{{ countNoti }}</span>
                  <p class="hidden-lg hidden-md">Notifications</p>
                </a>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a href="#">Mike John responded to your email</a></li>
                  <li><a href="#">You have 5 new tasks</a></li>
                </ul>
              </drop-down>
            </md-list-item> -->

            <li class="md-list-item">
              <a
                href=""
                class="md-list-item-router md-list-item-container md-button-clean dropdown"
              >
                <div class="md-list-item-content">
                  <drop-down>
                    <md-button
                      slot="title"
                      class="md-button md-just-icon md-simple"
                      data-toggle="dropdown"
                    >
                      <md-icon>notifications</md-icon>
                      <span class="notification">{{ countNoti }}</span>
                      <p class="hidden-lg hidden-md">Notifications</p>
                    </md-button>
                    <ul class="dropdown-menu dropdown-menu-right" style="max-height: 300px; overflow: scroll;">
                        <li v-for="(item, index) in allNoti" :key="index" v-bind:class="(item.reader == 0) ? 'gray' : ''">
                            <a @click="readNoti(item.id)">{{ item.content }}</a>
                        </li>
                        <li><a style="float: right;" @click="readAll()">Đã xem</a></li>
                    </ul>
                  </drop-down>
                </div>
              </a>
            </li>
          </md-list>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
export default {
  data: function() {
    return {
      selectedEmployee: null,
      employees: [
        "Jim Halpert",
        "Dwight Schrute",
        "Michael Scott",
        "Pam Beesly",
        "Angela Martin",
        "Kelly Kapoor",
        "Ryan Howard",
        "Kevin Malone"
      ],
      countNoti: '',
      allNoti: []
    };
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    getCountNoti: function() {
        var me = this;
        $.ajax({
            url: 'http://localhost:3000/api/notification/countNoti',
            methods: 'GET',
            dataType: 'json',
            data: {},
            success: function (res) {
                me.countNoti = res.count;
            },
            error: function(err) {
                console.log(err)
            }
        })
    },
    getAllNoti: function() {
        var me = this;
        $.ajax({
            url: 'http://localhost:3000/api/notification',
            methods: 'GET',
            dataType: 'json',
            data: {},
            success: function (res) {
                me.allNoti = res;
            },
            error: function(err) {
                console.log(err)
            }
        })
    },
    readNoti: function(id) {
        var me = this;
        fetch('http://localhost:3000/api/notification/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
        })
        .then(response => response.json())
        .then(data => {
            me.getCountNoti();
            me.getAllNoti();
        })
        .catch((error) => {
        });
    },
    readAll: function() {
        $.ajax({
            url: 'http://localhost:3000/api/notification/readAll',
            methods: 'GET',
            dataType: 'json',
            data: {},
            success: function (res) {
                this.getCountNoti();
                this.getAllNoti();
            },
            error: function(err) {
                console.log(err)
            }
        })
    }
  },
  created: function() {
    this.getCountNoti();
    this.getAllNoti();
  }
};
</script>

<style>
.gray {
    background-color: gray;
}
</style>
