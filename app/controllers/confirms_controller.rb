class ConfirmsController < ApplicationController
  before_action :set_confirm, only: [:show, :edit, :update, :destroy]

  # GET /confirms
  def index
    @confirms = Confirm.all
  end

  # GET /confirms/1
  def show
  end

  # GET /confirms/new
  def new
    @confirm = Confirm.new
  end

  # GET /confirms/1/edit
  def edit
  end

  # POST /confirms
  def create
    @confirm = Confirm.new(confirm_params)

    if @confirm.save
      redirect_to @confirm, notice: 'Confirm was successfully created.'
    else
      render :new
    end
  end

  # PATCH/PUT /confirms/1
  def update
    if @confirm.update(confirm_params)
      redirect_to @confirm, notice: 'Confirm was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /confirms/1
  def destroy
    @confirm.destroy
    redirect_to confirms_url, notice: 'Confirm was successfully destroyed.'
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_confirm
      @confirm = Confirm.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def confirm_params
      params.require(:confirm).permit(:name, :companion, :childs, :allergic, :comment)
    end
end
