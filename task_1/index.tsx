// ФАЙЛ ДЛЯ РЕДАКТИРОВАНИЯ И ТЕСТИРОВАНИЯ КОМПОНЕНТОВ ИЗ ТЕСТОВОГО ЗАДАНИЯ

import React, { Component } from 'react'
import { IProps, IUser } from './interface'

// Просто оборачиваем в memo
export const FirstComponent = React.memo(({ name, age }: IUser) => {
	console.log('FirstComponent has been updated')

	return (
		<div>
			my name is {name}, my age is {age}
		</div>
	)
})

// тут у нас user - это объект, а объекты по ссылкам сравниваются, поэтому я тут написала компаратор
export const SecondComponent = React.memo(
	({ user: { name, age } }: IProps) => (
		<div>
			my name is {name}, my age is {age}
		</div>
	),
	(prevProps, nextProps) => {
		return (
			prevProps.user.name === nextProps.user.name &&
			prevProps.user.age === nextProps.user.age
		)
	}
)

// так как это классовый компонент, то используем PureComponent
export class ThirdComponent extends React.PureComponent<IUser> {
	render() {
		console.log('ThirdComponent has been updated')

		return (
			<div>
				my name is {this.props.name}, my age is {this.props.age}
			</div>
		)
	}
}

// тоже самое что во втором, но только для классового компонента
export class FourthComponent extends Component<IProps> {
	shouldComponentUpdate(nextProps: IProps) {
		return (
			this.props.user.name !== nextProps.user.name ||
			this.props.user.age !== nextProps.user.age
		)
	}
	render() {
		console.log('FourthComponent has been updated')

		return (
			<div>
				my name is {this.props.user.name}, my age is {this.props.user.age}
			</div>
		)
	}
}
