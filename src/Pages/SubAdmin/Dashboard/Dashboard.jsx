import React from "react"
import Brandcrump from "../../../Component/Brandcrump"
function Dashboard() {  
    return (
      <>
       <div class="dashboard-main-body">
       <Brandcrump 
        pageName="Dashboard" 
        title="SubAdmin Dashboard" 
        url="/dashboard" 
        breadcrumb="" 
      />
        <div class="row row-cols-xxxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 gy-4">
          <div class="col">
            <div class="card shadow-none border bg-gradient-start-1 h-100">
              <div class="card-body p-20">
                <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                    <p class="fw-medium text-primary-light mb-1">Total E-Rickshaw</p>
                    <h6 class="mb-0">20,000</h6>
                  </div>
                  <div class="w-50-px h-50-px bg-cyan rounded-circle d-flex justify-content-center align-items-center">
                    <iconify-icon icon="gridicons:multiple-users" class="text-white text-2xl mb-0"></iconify-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card shadow-none border bg-gradient-start-2 h-100">
              <div class="card-body p-20">
                <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                    <p class="fw-medium text-primary-light mb-1">QR Allowed</p>
                    <h6 class="mb-0">15,000</h6>
                  </div>
                  <div class="w-50-px h-50-px bg-purple rounded-circle d-flex justify-content-center align-items-center">
                    <iconify-icon icon="fa-solid:award" class="text-white text-2xl mb-0"></iconify-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card shadow-none border bg-gradient-start-3 h-100">
              <div class="card-body p-20">
                <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                    <p class="fw-medium text-primary-light mb-1">Total Routes</p>
                    <h6 class="mb-0">5,000</h6>
                  </div>
                  <div class="w-50-px h-50-px bg-info rounded-circle d-flex justify-content-center align-items-center">
                    <iconify-icon icon="fluent:people-20-filled" class="text-white text-2xl mb-0"></iconify-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card shadow-none border bg-gradient-start-4 h-100">
              <div class="card-body p-20">
                <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                    <p class="fw-medium text-primary-light mb-1">Total Zone</p>
                    <h6 class="mb-0">$42,000</h6>
                  </div>
                  <div class="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                    <iconify-icon icon="solar:wallet-bold" class="text-white text-2xl mb-0"></iconify-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card shadow-none border bg-gradient-start-4 h-100">
              <div class="card-body p-20">
                <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                    <p class="fw-medium text-primary-light mb-1">Total Zone</p>
                    <h6 class="mb-0">$42,000</h6>
                  </div>
                  <div class="w-50-px h-50-px bg-success-main rounded-circle d-flex justify-content-center align-items-center">
                    <iconify-icon icon="solar:wallet-bold" class="text-white text-2xl mb-0"></iconify-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card shadow-none border bg-gradient-start-5 h-100">
              <div class="card-body p-20">
                <div class="d-flex flex-wrap align-items-center justify-content-between gap-3">
                  <div>
                    <p class="fw-medium text-primary-light mb-1">Today Challan</p>
                    <h6 class="mb-0">$30,000</h6>
                  </div>
                  <div class="w-50-px h-50-px bg-red rounded-circle d-flex justify-content-center align-items-center">
                    <iconify-icon icon="fa6-solid:file-invoice-dollar" class="text-white text-2xl mb-0"></iconify-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }
  export default Dashboard