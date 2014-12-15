class Api::UsersController < ApplicationController
  
  def create
    @user = User.new(user_params)
    if @user.save
      login_user!(@user)
      render json: @user
    else
      render json: @user.errors.full_messages, 
             status: :unprocessable_entity
    end
  end
  
  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
  
end