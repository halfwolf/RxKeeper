class Api::PrescriptionsController < ApplicationController
  
  before_action :require_user!
  
  def index
    @prescriptions = current_user.prescriptions
    render json: @prescriptions
  end
  
  def show
    @prescription = Prescription.find(params[:id])
    render json: @prescription
  end
  
  def create
    @prescription = current_user.prescriptions.new(prescription_params)
    if @prescription.save
      render json: @prescription
    else
      render json: @prescription.errors.full_messages, 
             status: :unprocessable_entity
    end
  end
  
  def update
    @prescription = Prescription.find(params[:id])
    if @prescriptions.update_attributes(prescription_params)
      render json: @prescription
    else
      render json: @prescription.errors.full_messages, 
             status: :unprocessable_entity
    end
  end
  
  def destroy
    @prescription = current_user.prescriptions.find(params[:id])
    @prescription.try(:destroy)
    render json: {}
  end
  
  private
  
  def prescription_params
    params.require(:prescription).permit(:name, :contacts, :right_sph, :right_cyl, :right_axis, 
                                        :right_bc, :right_diam, :left_sph, 
                                        :left_cyl, :left_axis, 
                                        :left_bc, :left_diam)
  end

end