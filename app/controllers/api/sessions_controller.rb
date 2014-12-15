class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if @user.nil?
      render json: ["Email or Password is Incorrect"],
             status: :unprocessable_entity
    else
      login_user!(@user)
      render json: @user
    end
  end

  def status
    if current_user
      render json: [authorized: true, username: current_user.username]
    else
      render json: [unauthorized: true]
    end
  end

  def destroy
    logout_user!
    render json: {}
  end

end