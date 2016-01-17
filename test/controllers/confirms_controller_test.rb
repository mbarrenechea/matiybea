require 'test_helper'

class ConfirmsControllerTest < ActionController::TestCase
  setup do
    @confirm = confirms(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:confirms)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create confirm" do
    assert_difference('Confirm.count') do
      post :create, confirm: { allergic: @confirm.allergic, childs: @confirm.childs, comment: @confirm.comment, companion: @confirm.companion, name: @confirm.name }
    end

    assert_redirected_to confirm_path(assigns(:confirm))
  end

  test "should show confirm" do
    get :show, id: @confirm
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @confirm
    assert_response :success
  end

  test "should update confirm" do
    patch :update, id: @confirm, confirm: { allergic: @confirm.allergic, childs: @confirm.childs, comment: @confirm.comment, companion: @confirm.companion, name: @confirm.name }
    assert_redirected_to confirm_path(assigns(:confirm))
  end

  test "should destroy confirm" do
    assert_difference('Confirm.count', -1) do
      delete :destroy, id: @confirm
    end

    assert_redirected_to confirms_path
  end
end
